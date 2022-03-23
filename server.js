/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   server.js
Updated:    03/06/2022

TO RUN THIS APPLICATION ON A LOCAL MACHINE PRIOR TO DEPLOYMENT ENTER THIS TERMINAL COMMAND IN VSCODE TERMINAL:

node server.js

*/

"use strict";

const express = require("express");
const fetch = require("node-fetch");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
app.use(express.static("public"));
app.use(express.json({ limit: "5mb" }));

/* RAWG API Requests
=================================================================================================*/

app.get("/carousel/:entries", async (request, response) => {
    const requestedDates = request.params.entries.split(",");
    const api_key = process.env.RAWG_KEY;
    const endpoint = `https://api.rawg.io/api/games?key=${api_key}&dates=${requestedDates[0]},${requestedDates[1]}&ordering=-added`;
    const popular_response = await fetch(endpoint);
    const data = await popular_response.json();
    response.json(data);
});

app.get("/keywordSearch/:entries", async (request, response) => {
    const keyword = request.params.entries;
    const api_key = process.env.RAWG_KEY;
    const endpoint = `https://api.rawg.io/api/games?key=${api_key}&search=${keyword}`;
    const keyword_response = await fetch(endpoint);
    const data = await keyword_response.json();
    response.json(data);
});

app.get("/gameDetails/:entries", async (request, response) => {
    const id = request.params.entries;
    const api_key = process.env.RAWG_KEY;
    const endpoint = `https://api.rawg.io/api/games/${id}?key=${api_key}`;
    const gameDetails_response = await fetch(endpoint);
    const data = await gameDetails_response.json();
    response.json(data);
});

app.get("/gameImages/:entries", async (request, response) => {
    const id = request.params.entries;
    const api_key = process.env.RAWG_KEY;
    const endpoint = `https://api.rawg.io/api/games/${id}/screenshots?key=${api_key}`;
    const gameDetails_response = await fetch(endpoint);
    const data = await gameDetails_response.json();
    response.json(data);
});

/* Gamespot API requests
=================================================================================================*/

app.get("/gameId/:entries", async (request, response) => {
    const title = request.params.entries;
    const api_key = process.env.GS_KEY;
    const endpoint = `http://www.gamespot.com/api/games/?api_key=${api_key}&format=json&filter=name:${title}`;
    const gameId_response = await fetch(endpoint);
    const data = await gameId_response.json();
    response.json(data);
});

app.get("/gameReviews/:entries", async (request, response) => {
    const id = request.params.entries;
    const api_key = process.env.GS_KEY;
    const endpoint = `http://www.gamespot.com/api/reviews/?api_key=${api_key}&format=json&filter=association%3A5000-${id}`;
    const gameReviews_response = await fetch(endpoint);
    const data = await gameReviews_response.json();
    response.json(data);
});