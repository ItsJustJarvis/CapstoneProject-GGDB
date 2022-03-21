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

