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

app.get("/games", async (request, response) => {
    const api_key = process.env.API_KEY;
    const review_endp = `https://api.rawg.io/api/games?key=${api_key}`;
    const review_response = await fetch(review_endp);
    const review_data = await review_response.json();
    response.json(review_data);
});


// app.get("/search/:entries", async (request, response) => {
//     const entries = request.params.entries.split(",");
//     let queryParameters = "";
//     for(const entry in entries){
//         queryParameters += `${entries[entry]}`;
//     }
//     const api_key = process.env.API_KEY;
//     const review_endp = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?${encodeURI(queryParameters)}api-key=${api_key}`;
//     const review_response = await fetch(review_endp);
//     const review_data = await review_response.json();
//     response.json(review_data);
// });