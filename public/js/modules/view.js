/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   view.js
Updated:    03/21/2022
*/

"use strict";

let showFilters = document.querySelector(".filter-button");
let cancelFilters = document.querySelector(".cancel-filters");
let submitFilters = document.querySelector(".submit-filters");
let submitSearch = document.querySelector(".submit-button");
let carousels = document.querySelectorAll(".carousel");
let gameDetails = document.querySelector(".details");
let gallery = document.querySelector(".details__gallery");
let reviews = document.querySelector(".reviews__output");
let searchResults = document.querySelector(".results__output");

export {showFilters, cancelFilters,submitFilters,submitSearch,carousels,gameDetails,gallery,reviews,searchResults};