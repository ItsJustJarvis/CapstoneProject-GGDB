/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   server.js
Updated:    02/26/2022
*/

"use strict";

const express = require("express");
const Datastore = require("nedb");
const fetch = require("node-fetch");
const app = express();
require("dotenv").config();

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
app.use(express.static("public"));
app.use(express.json({ limit: "5mb" }));

// Database Requests

const database = new Datastore("game-list.db");
database.loadDatabase();

app.get("/database", (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post("/database", (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});

// RAWG API Requests

app.get("/popular", async (request, response) => {
    const api_key = process.env.RAWG_KEY;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const startDate = `${year - 1}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
    const endDate = `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
    const endpoint = `https://api.rawg.io/api/games?key=${api_key}&dates=${startDate},${endDate}&ordering=-added`;
    const popular_response = await fetch(endpoint);
    const data = await popular_response.json();
    response.json(data);
});

app.get("/newReleases", async (request, response) => {
    const api_key = process.env.RAWG_KEY;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const startDate = `${year}-${month < 10 ? "0" + (month - 1) : (month - 1)}-${date < 10 ? "0" + date : date}`;
    const endDate = `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
    const endpoint = `https://api.rawg.io/api/games?key=${api_key}&dates=${startDate},${endDate}&ordering=-added`;
    const newRelease_response = await fetch(endpoint);
    const data = await newRelease_response.json();
    response.json(data);
});

app.get("/anticipated", async (request, response) => {
    const api_key = process.env.RAWG_KEY;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const startDate = `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
    const endDate = `${year + 1}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
    const endpoint = `https://api.rawg.io/api/games?key=${api_key}&dates=${startDate},${endDate}&ordering=-added`;
    const anticipated_response = await fetch(endpoint);
    const data = await anticipated_response.json();
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

// Gamespot API requests

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