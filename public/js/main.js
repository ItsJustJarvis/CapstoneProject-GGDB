/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   main.js
Updated:    02/26/2022
*/

"use strict";

import {toggleForm} from "./modules/collapse.js";

import * as Carousel from "./modules/carousel.js";

let showFilters = document.querySelector(".filter-button");
if (showFilters != null){
    showFilters.addEventListener("click", toggleForm);
} 

let cancelFilters = document.querySelector(".cancel-filters");
if( cancelFilters != null) {
    cancelFilters.addEventListener("click", toggleForm);
}

let submitSearch = document.querySelector(".submit-button");
if (submitSearch != null) {
    submitSearch.addEventListener("click", function () {
        location.href = "results.html";
    });
}

/* API request functions
=================================================================================================*/

async function getPopularGames() {
    let games;
    try {
        const api_url = "/popular/";
        const response = await fetch(api_url);
        const json = await response.json();
        games = json.results;
        console.log("Popular:");
        console.log(games);
        displayData("pop", games);
    } catch (error) {
        console.error(error);
    }
}
    let games;
    try {
        const api_url = "/games/";
        const response = await fetch(api_url);
        const json = await response.json();
        games = json.results;
        console.log(games);
    } catch (error) {
        console.error(error);
    }
}

getGames();
    const slice = data.slice(Carousel.carouselStart, Carousel.carouselEnd);
    console.log(slice);

    for(let i=0; i < slice.length; i++){
        const carouselItem = i+1;
        
        const image = document.querySelector(`.${list}-img-${carouselItem}`);
        image.setAttribute("src", data[i].background_image);

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

