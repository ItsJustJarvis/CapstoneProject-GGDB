/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   main.js
Updated:    02/26/2022
*/

"use strict";

import {toggleForm} from "./modules/collapse.js";

let showFilters = document.querySelector(".filter-button");
showFilters.addEventListener("click", toggleForm);

let cancelFilters = document.querySelector(".cancel-filters");
cancelFilters.addEventListener("click", toggleForm);