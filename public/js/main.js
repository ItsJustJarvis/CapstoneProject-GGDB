/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   main.js
Updated:    02/26/2022
*/

"use strict";

import {toggleForm} from "./modules/collapse.js";

let showFilters = document.querySelector(".filter-button");
if (showFilters != null){
    showFilters.addEventListener("click", toggleForm);
} 

let cancelFilters = document.querySelector(".cancel-filters");
if( cancelFilters != null) {
    cancelFilters.addEventListener("click", toggleForm);
}

let submitSearch = document.querySelector(".submit-button");
if (submitSearch != null) {
    submitSearch.addEventListener("click", function () {
        location.href = "results.html";
    });
}

