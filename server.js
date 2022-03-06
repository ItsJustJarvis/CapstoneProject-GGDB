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

app.get("/api", (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post("/api", (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});

// API Requests

app.get("/popular", async (request, response) => {
    const api_key = process.env.API_KEY;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const startDate = `${year - 1}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
    const endDate = `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
    const popular_endp = `https://api.rawg.io/api/games?key=${api_key}&dates=${startDate},${endDate}&ordering=-added`;
    const popular_response = await fetch(popular_endp);
    const popular_data = await popular_response.json();
    response.json(popular_data);
});

app.get("/newReleases", async (request, response) => {
    const api_key = process.env.API_KEY;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const startDate = `${year}-${month < 10 ? "0" + (month - 1) : (month - 1)}-${date < 10 ? "0" + date : date}`;
    const endDate = `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
    const popular_endp = `https://api.rawg.io/api/games?key=${api_key}&dates=${startDate},${endDate}&ordering=-added`;
    const popular_response = await fetch(popular_endp);
    const popular_data = await popular_response.json();
    response.json(popular_data);
});

app.get("/anticipated", async (request, response) => {
    const api_key = process.env.API_KEY;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const startDate = `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
    const endDate = `${year + 1}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
    const anticipated_endp = `https://api.rawg.io/api/games?key=${api_key}&dates=${startDate},${endDate}&ordering=-added`;
    const anticipated_response = await fetch(anticipated_endp);
    const anticipated_data = await anticipated_response.json();
    response.json(anticipated_data);
});

app.get("/keywordSearch/:entries", async (request, response) => {
    const keyword = request.params.entries;
    console.log(keyword);
    const api_key = process.env.API_KEY;
    const review_endp = `https://api.rawg.io/api/games?key=${api_key}&search=${keyword}`;
    const review_response = await fetch(review_endp);
    const review_data = await review_response.json();
    response.json(review_data);
});