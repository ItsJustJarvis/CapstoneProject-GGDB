/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   request.js
Updated:    03/21/2022
*/

"use strict";


async function getCarouselData(gameList) {
    let games;
    const requestDates = getRequestDates(gameList);
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
    let requestDates = `${gameList.startDate},${gameList.endDate}`;
    return requestDates;
}

function setRequestDates(gameList) {
    
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

export {getCarouselData,setRequestDates};
