/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   request.js
Updated:    03/21/2022
*/

"use strict";


/* API request functions
=================================================================================================*/

async function carouselData(gameList) {
    let games;
    const requestDates = getDates(gameList);
    try {
        const api_url = `/carousel/${requestDates}`;
        const response = await fetch(api_url);
        const json = await response.json();
        games = json.results;
        return games;
    } catch (error) {
        console.error(error);
    }
}

async function keywordSearchData(keyword){
    let games;
    try {
        const api_url = `/keywordSearch/${keyword}`;
        const response = await fetch(api_url);
        const json = await response.json();
        games = json.results;
        return games;
    } catch (error) {
        console.error(error);
    }
}

async function gameDetailsData(id){
    try {
        const details_url = `/gameDetails/${id}`;
        const response = await fetch(details_url);
        const data = await response.json();
        const images_url = `/gameImages/${id}`;
        const images_response = await fetch(images_url);
        const images_data = await images_response.json();
        data.screenshots = images_data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function gameReviewsData(title) {
    let gameId = 0;
    try {
        const game_url = `/gameId/${title}`;
        const game_response = await fetch(game_url);
        const game_data = await game_response.json();
        game_data.results.forEach(element => {
            if(element.name == title ){
                gameId = element.id;
            } 
        });
        if (gameId != 0){
            const review_url = `/gameReviews/${gameId}`;
            const review_response = await fetch(review_url);
            const review_data = await review_response.json();
            return review_data;  
        }       
    } catch (error) {
        console.error(error);
    }
}



/* Request Date Getter and Setter
=================================================================================================*/

function getDates(gameList){
    let requestDates = `${gameList.startDate},${gameList.endDate}`;
    return requestDates;
}

function setDates(gameList) {
    
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    if (gameList.name == "popular"){
        gameList.startDate = `${year - 1}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
        gameList.endDate = `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
    }

    if (gameList.name == "new"){
        gameList.startDate = `${year}-${month < 10 ? "0" + (month - 1) : (month - 1)}-${date < 10 ? "0" + date : date}`;
        gameList.endDate = `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
    }

    if (gameList.name == "anticipated"){
        gameList.startDate = `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
        gameList.endDate = `${year + 1}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
    }
}

/* Module Exports
=================================================================================================*/

export {carouselData, setDates, keywordSearchData, gameDetailsData, gameReviewsData};
