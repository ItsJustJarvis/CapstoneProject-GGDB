/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   main.js
Updated:    03/06/2022
*/

"use strict";

import {toggleForm} from "./modules/collapse.js";

import * as Carousel from "./modules/carousel.js";


/* UI References
=================================================================================================*/

let showFilters = document.querySelector(".filter-button");
if (showFilters != null){
    showFilters.addEventListener("click", toggleForm);
} 

let cancelFilters = document.querySelector(".cancel-filters");
if( cancelFilters != null) {
    cancelFilters.addEventListener("click", toggleForm);
}

let submitFilters = document.querySelector(".submit-filters");
if(submitFilters != null){
    submitFilters.addEventListener("click", toggleForm);
}

let submitSearch = document.querySelector(".submit-button");
if (submitSearch != null) {
    submitSearch.addEventListener("click", function () {
        let keyword = getSearchbarInput();
        getKeywordSearch(keyword);
    });
}

let carousels = document.querySelectorAll(".carousel");
if (carousels.length > 0) {
    getCarouselLists();
}

let gameDetails = document.querySelector(".details");
if(gameDetails != null){
    getGameDetails();
}

let gallery = document.querySelector(".details__gallery");
if(gallery != null) {
    getGameImages();
}

let reviews = document.querySelector(".reviews__output");

let searchResults = document.querySelector(".results__output");

/* API request functions
=================================================================================================*/

async function getPopularGames() {
    let games;
    try {
        const api_url = "/popular/";
        const response = await fetch(api_url);
        const json = await response.json();
        games = json.results;
        displayCardData("pop", games);
    } catch (error) {
        console.error(error);
    }
}

async function getNewGames() {
    let games;
    try {
        const api_url = "/newReleases/";
        const response = await fetch(api_url);
        const json = await response.json();
        games = json.results;
        displayCardData("new", games);
    } catch (error) {
        console.error(error);
    }
}

async function getAnticipatedGames() {
    let games;
    try {
        const api_url = "/anticipated/";
        const response = await fetch(api_url);
        const json = await response.json();
        games = json.results;
        displayCardData("ant", games);
    } catch (error) {
        console.error(error);
    }
}

async function getCarouselLists() {
    getPopularGames();
    getNewGames();
    getAnticipatedGames();
}

async function getKeywordSearch(keyword){
    clearResultsList();
    let games;
    try {
        const api_url = `/keywordSearch/${keyword}`;
        const response = await fetch(api_url);
        const json = await response.json();
        games = json.results;
        if(games !== null){
            for(let game of games){
                generateGameCard(game);
            }
        } else {
            searchResults.innerText = "Sorry no results for that search. Please try different values.";
        }
    } catch (error) {
        searchResults.innerText - "Error obtaining data.";
        console.error(error);
    }
}

async function getGameDetails(){
    let id = getGameId();
    try {
        const api_url = `/gameDetails/${id}`;
        const response = await fetch(api_url);
        const data = await response.json();
        displayGameDetails(data);
        getReviews(data.name);
    } catch (error) {
        console.error(error);
    }
}

async function getGameImages() {
    let id = getGameId();
    try {
        const api_url = `/gameImages/${id}`;
        const response = await fetch(api_url);
        const data = await response.json();
        displayGameGallery(data);
    } catch (error) {
        console.error(error);
    }
}

async function getReviews(title) {
    try {
        const game_url = `/gameId/${title}`;
        const game_response = await fetch(game_url);
        const game_data = await game_response.json();
        let gameId;
        game_data.results.forEach(element => {
            if(element.name == title ){
                gameId = element.id;
            }
        });        
        // const gameId = game_data.results[0].id;
        const review_url = `/gameReviews/${gameId}`;
        const review_response = await fetch(review_url);
        const review_data = await review_response.json();
        displayReviews(review_data);        
    } catch (error) {
        console.error(error);
    }
}


/* Display Ouput functions
=================================================================================================*/

function displayCardData(list, data) {

    for (const [key, value] of Object.entries(data)){
        if (value == null || value == ""){
            data[`${key}`] = "N/A";
        }
    }

    const slice = data.slice(Carousel.carouselStart, Carousel.carouselEnd);

    for(let i=0; i < slice.length; i++){
        const carouselItem = i+1;

        const pageLink = document.querySelector(`.${list}-link-${carouselItem}`);
        pageLink.setAttribute("href", `game_details.html?id=${data[i].id}`);
        
        const image = document.querySelector(`.${list}-img-${carouselItem}`);
        image.setAttribute("src", data[i].background_image);
        image.setAttribute("alt", `${data[i].name}-Art`);

        const titleList = document.querySelectorAll(`.${list}-title-${carouselItem}`);
        titleList.forEach(element => element.innerText = data[i].name);

        const platform = document.querySelector(`.${list}-platform-${carouselItem}`);
        let platformList = [];
        data[i].platforms.forEach(element => platformList.push(element.platform.name));
        platform.innerText = platformList.join(", ");

        const genre = document.querySelector(`.${list}-genre-${carouselItem}`);
        let genreList = [];
        data[i].genres.forEach(element => genreList.push(element.name));
        genre.innerText = genreList.join(", ");

        const release = document.querySelector(`.${list}-release-${carouselItem}`);
        release.innerText = data[i].released;
    }
}

function displayGameDetails (data) {

    for (const [key, value] of Object.entries(data)){
        if (value == null || value == ""){
            data[`${key}`] = "N/A";
        }
    }

    const image = document.querySelector(".bio__card__image");
    image.setAttribute("src", data.background_image);

    const title = document.querySelector(".bio__card__content__title");
    title.innerText = data.name;

    const metacritic = document.querySelector(".metacritic");
    metacritic.innerText = data.metacritic;

    const description = document.querySelector(".bio__card__content__description");
    description.innerText = data.description_raw;

    const platform = document.querySelector(".platform");
    let platformList = [];
    data.platforms.forEach(element => platformList.push(element.platform.name));
    platform.innerText = platformList.join(", ");

    const developer = document.querySelector(".developer");
    let developerList = [];
    data.developers.forEach(element => developerList.push(element.name));
    developer.innerText = developerList.join(", ");

    const players = document.querySelector(".players");
    players.innerText = "N/A";

    const publisher = document.querySelector(".publisher");
    let publisherList = [];
    data.publishers.forEach(element => publisherList.push(element.name));
    publisher.innerText = publisherList.join(", ");

    const genre = document.querySelector(".genre");
    let genreList = [];
    data.genres.forEach(element => genreList.push(element.name));
    genre.innerText = genreList.join(", ");

    const esrb = document.querySelector(".esrb-rating");
    esrb.innerText = data.esrb_rating.name;

    const release = document.querySelector(".release-date");
    release.innerText = data.released;

    const websiteLink = document.querySelector(".website-link");
    websiteLink.setAttribute("href", data.website);
    websiteLink.setAttribute("target", "_blank");
    websiteLink.innerText = data.website;
}

function displayGameGallery(data) {
    data.results.forEach(element => generateGalleryImage(element));
}

function displayReviews(data){
    if(data.results.length > 0) {
        data.results.forEach(element => generateReviewCard(element));
    } else {
        reviews.innerText = "No review data available for this game.";
    }    
}

/* Dynamic Generation functions
=================================================================================================*/

function generateGameCard(data) {

    const card = document.createElement("div");
    card.classList.add("card");

    const pageLink = document.createElement("a");
    pageLink.setAttribute("href", `game_details.html?id=${data.id}`);

    const mainImage = document.createElement("img");
    mainImage.setAttribute("src", data.background_image);
    mainImage.setAttribute("alt", `${data.name}-art`);

    const content = document.createElement("div");
    content.classList.add("card__content");

    const details = document.createElement("ul");
    details.classList.add("card__content__details");

    const title = document.createElement("p");
    const titleData = document.createElement("span");
    titleData.innerText = data.name;
    title.append(titleData);

    const title2 = document.createElement("p");
    const titleData2 = document.createElement("span");
    titleData2.innerText = data.name;
    title2.append(titleData2);

    const platform = document.createElement("li");
    platform.innerText = "Platform: ";
    const platformData = document.createElement("span");
    let platformList = [];
    data.platforms.forEach(element => platformList.push(element.platform.name));
    platformData.innerText = platformList.join(", ");
    platform.append(platformData);
    
    const genre = document.createElement("li");
    genre.innerText = "Genre: ";
    const genreData = document.createElement("span");
    let genreList = [];
    data.genres.forEach(element => genreList.push(element.name));
    genreData.innerText = genreList.join(", ");
    genre.append(genreData);

    const release = document.createElement("li");
    release.innerText = "Release: ";
    const releaseData = document.createElement("span");
    releaseData.innerText = data.released;
    release.append(releaseData);

    details.append(platform, genre, release);
    content.append(title, details);
    pageLink.append(mainImage, title2, content);
    card.append(pageLink);

    searchResults.append(card);
}

function generateGalleryImage(data) {
    let image = document.createElement("img");
    image.classList.add("details__gallery__image");
    image.setAttribute("src", data.image);
    image.setAttribute("alt", "game-screenshot");

    gallery.append(image);
}

function generateReviewCard(data) {

    let reviewCard = document.createElement("div");
    reviewCard.classList.add("reviews__output__card");

    let reviewTitle = document.createElement("h3");
    reviewTitle.innerText = data.title;
    
    let reviewLink = document.createElement("a");
    reviewLink.setAttribute("href", data.site_detail_url);
    reviewLink.setAttribute("target", "_blank");
    reviewLink.classList.add("highlight-green");    

    let reviewAuthor = document.createElement("p");
    reviewAuthor.innerText = `Author: ${data.authors}`;

    let reviewExerpt = document.createElement("p");
    reviewExerpt.innerText = data.lede;

    reviewLink.append(reviewTitle);

    reviewCard.append(reviewLink, reviewAuthor, reviewExerpt);

    reviews.append(reviewCard);
}

/* Search functions
=================================================================================================*/

function getSearchbarInput() {
    let keyword = document.querySelector(".entry");
    return keyword.value;
}

function clearResultsList() {
    while(searchResults.firstChild){
        searchResults.removeChild(searchResults.firstChild);    
    }
}

function getGameId() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let value = params.id;
    return value;
}
