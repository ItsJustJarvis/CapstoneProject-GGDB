/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   view.js
Updated:    03/22/2022
*/

"use strict";

function getSearchbarInput() {
    let keyword = document.querySelector(".entry");
    return keyword.value;
}

export {getSearchbarInput};