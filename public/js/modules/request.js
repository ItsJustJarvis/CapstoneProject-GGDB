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
    const now = {year: today.getFullYear(), month: today.getMonth()+1, date: today.getDate()};

    if (gameList.name == "popular"){
        const aYearAgo = new Date();
        aYearAgo.setFullYear(today.getFullYear()-1);
        const startDate = {year: aYearAgo.getFullYear(), month: aYearAgo.getMonth()+1, date: aYearAgo.getDate() };
        gameList.startDate = `${startDate.year}-${startDate.month < 10 ? "0" + startDate.month : startDate.month}-${startDate.date < 10 ? "0" + startDate.date : startDate.date}`;
        gameList.endDate = `${now.year}-${now.month < 10 ? "0" + now.month : now.month}-${now.date < 10 ? "0" + now.date : now.date}`;
    }

    if (gameList.name == "new"){
        const aMonthAgo = new Date();
        aMonthAgo.setMonth(today.getMonth()-1);
        const startDate = {year: aMonthAgo.getFullYear(), month: aMonthAgo.getMonth()+1, date: aMonthAgo.getDate() };
        gameList.startDate = `${startDate.year}-${startDate.month < 10 ? "0" + (startDate.month) : (startDate.month)}-${startDate.date < 10 ? "0" + startDate.date : startDate.date}`;
        gameList.endDate = `${now.year}-${now.month < 10 ? "0" + now.month : now.month}-${now.date < 10 ? "0" + now.date : now.date}`;
    }

    if (gameList.name == "anticipated"){
        const aYearFromNow = new Date();
        aYearFromNow.setFullYear(today.getFullYear() + 1);
        const endDate = {year: aYearFromNow.getFullYear(), month: aYearFromNow.getMonth()+1, date: aYearFromNow.getDate() };
        gameList.startDate = `${now.year}-${now.month < 10 ? "0" + now.month : now.month}-${now.date < 10 ? "0" + now.date : now.date}`;
        gameList.endDate = `${endDate.year}-${endDate.month < 10 ? "0" + endDate.month : endDate.month}-${endDate.date < 10 ? "0" + endDate.date : endDate.date}`;
    }
}

/* Module Exports
=================================================================================================*/

export {carouselData, setDates, keywordSearchData, gameDetailsData, gameReviewsData};
