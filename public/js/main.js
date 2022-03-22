/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   main.js
Updated:    03/06/2022

TO RUN THIS APPLICATION ON A LOCAL MACHINE PRIOR TO DEPLOYMENT ENTER THIS TERMINAL COMMAND IN VSCODE TERMINAL:

node server.js

*/

"use strict";

import {toggleForm} from "./modules/collapse.js";

import * as Carousel from "./modules/carousel.js";

import * as View from "./modules/view.js";

import * as Request from "./modules/request.js";

/* View conditional checks and event listeners
=================================================================================================*/

if (View.showFilters != null){
    View.showFilters.addEventListener("click", toggleForm);
} 

if( View.cancelFilters != null) {
    View.cancelFilters.addEventListener("click", toggleForm);
}

if(View.submitFilters != null){
    View.submitFilters.addEventListener("click", toggleForm);
}

if (View.submitSearch != null) {
    View.submitSearch.addEventListener("click", function () {
        let keyword = Search.getSearchbarInput();
        populateKeywordSearchResults(keyword);
    });
}

if (View.carousels.length > 0) {
    populateCarousels();
}

if(View.gameDetails != null){
    populateGamePageContent();
}

/* API Data Handlers
=================================================================================================*/

async function getCarouselGames(list) {
    Request.setDates(list);
    const games = await Request.carouselData(list);
    replaceEmptyPropertyValues(games);
    View.displayCarouselCard(list, games);
}

async function populateCarousels() {
    getCarouselGames({name: "popular"});
    getCarouselGames({name: "new"});
    getCarouselGames({name: "anticipated"});
}

async function populateKeywordSearchResults(keyword){
    clearResultsList();
    const games = await Request.keywordSearchData(keyword);
    if(games !== null){
        for(let game of games){
            View.generateGameCard(game);
        }
    } else {
        View.searchResults.innerText = "Sorry no results for that search. Please try a different game title.";
    }
}

async function populateGamePageContent(){
    let id = getGameId();
    const gameDetails = await Request.gameDetailsData(id);
    replaceEmptyPropertyValues(gameDetails);
    View.displayGameDetails(gameDetails);
    View.displayGameGallery(gameDetails.screenshots);
    const reviews = await Request.gameReviewsData(gameDetails.name);
    View.displayReviews(reviews);
}

/* Utility functions
=================================================================================================*/

function clearResultsList() {
    while(View.searchResults.firstChild){
        View.searchResults.removeChild(View.searchResults.firstChild);    
    }
}

function toggleForm(){
    let searchForm = document.querySelector(".search__form");
    if(!searchForm.classList.contains("open")){
        searchForm.classList.add("open");
    } else {
        searchForm.classList.remove("open");
    }
}

function getGameId() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let value = params.id;
    return value;
}

function replaceEmptyPropertyValues(data) {
    for (const [key, value] of Object.entries(data)){
        if (value == null || value == ""){
            data[`${key}`] = "N/A";
        }
    }
}