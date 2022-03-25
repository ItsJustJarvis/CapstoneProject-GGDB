/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   view.js
Updated:    03/21/2022
*/

"use strict";

/* UI References
=================================================================================================*/

let showFilters = document.querySelector(".filter-button");
let cancelFilters = document.querySelector(".cancel-filters");
let submitFilters = document.querySelector(".submit-filters");
let submitSearch = document.querySelector(".submit-button");
let carousels = document.querySelectorAll(".carousel");
let gameDetails = document.querySelector(".details");
let gallery = document.querySelector(".details__gallery");
let reviews = document.querySelector(".reviews__output");
let searchResults = document.querySelector(".results__output");

/* Dynamic Generation Functions
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

/* Display Functions
=================================================================================================*/

function displayCarouselCard(list, data) {

    const slice = data.slice(0, 4);

    for(let i=0; i < slice.length; i++){
        const carouselItem = i+1;

        const pageLink = document.querySelector(`.${list.name}-link-${carouselItem}`);
        pageLink.setAttribute("href", `game_details.html?id=${data[i].id}`);
        
        const image = document.querySelector(`.${list.name}-img-${carouselItem}`);
        image.setAttribute("src", data[i].background_image);
        image.setAttribute("alt", `${data[i].name}-Art`);

        const titleList = document.querySelectorAll(`.${list.name}-title-${carouselItem}`);
        titleList.forEach(element => element.innerText = data[i].name);

        const platform = document.querySelector(`.${list.name}-platform-${carouselItem}`);
        let platformList = [];
        data[i].platforms.forEach(element => platformList.push(element.platform.name));
        platform.innerText = platformList.join(", ");

        const genre = document.querySelector(`.${list.name}-genre-${carouselItem}`);
        let genreList = [];
        data[i].genres.forEach(element => genreList.push(element.name));
        genre.innerText = genreList.join(", ");

        const release = document.querySelector(`.${list.name}-release-${carouselItem}`);
        release.innerText = data[i].released;
    }
}

function displayGameDetails (data) {

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
    if(data != null && data.results.length > 0) {
        data.results.forEach(element => generateReviewCard(element));
    } else {
        reviews.innerText = "No review data available for this game.";
    }    
}

/* Utility Functions
=================================================================================================*/

function toggleVisibility(element){
    if(!element.classList.contains("open")){
        element.classList.add("open");
    } else {
        element.classList.remove("open");
    }
}

function getSearchbarInput() {
    return keyword.value;
}

function clearResultsList() {
    while(searchResults.firstChild){
        searchResults.removeChild(searchResults.firstChild);    
    }
}

function noResultsMessage() {
    searchResults.innerText = "Sorry no results for that search. Please try a different game title.";
}

/* Module Exports
=================================================================================================*/

export {
    showFilters,
    cancelFilters,
    submitFilters,
    submitSearch,
    carousels,
    gameDetails,
    gallery,
    reviews,
    searchResults, 
    generateGameCard, 
    generateGalleryImage, 
    generateReviewCard,
    displayCarouselCard,
    displayGameDetails,
    displayGameGallery,
    displayReviews    
};