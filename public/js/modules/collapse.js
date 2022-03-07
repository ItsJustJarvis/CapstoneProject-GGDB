/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   collapse.js
Updated:    02/26/2022
*/

"use strict";

function toggleForm(){
    let searchForm = document.querySelector(".search__form");
    if(!searchForm.classList.contains("open")){
        searchForm.classList.add("open");
    } else {
        searchForm.classList.remove("open");
    }
}


export {toggleForm};