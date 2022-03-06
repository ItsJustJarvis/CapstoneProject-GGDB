/*
Author:     Reeve Jarvis
Project:    GGDB-Good Game Database
Filename:   carousel.js
Updated:    02/26/2022
*/

"use strict";

export let carouselStart = 0;
export const carouselEnd = carouselStart + 4;

export function setCarouselBounds(start){
    carouselStart = start;
}

export function getCarouselBounds() {
    let bounds = {start: carouselStart, end: carouselEnd};

    return bounds;
}



// Possible Carousel Example to use for later improvements: 
// https://codepen.io/tuesta/pen/QoMqBY 
// Pen: Carousel YoutubeMusic 
// Author: victor tuesta ascoy 

// Other examples: https://freefrontend.com/javascript-carousels/


//NEEDS UPDATING TO FIT APP NEEDS AND MATCH STRUCTURE

// const gap = 32;

// const carousel = document.getElementById("results"),
//     content = document.getElementById("content"),
//     next = document.getElementById("next"),
//     prev = document.getElementById("prev");

// next.addEventListener("click", e => {
//     carousel.scrollBy(width + gap, 0);
//     if (carousel.scrollWidth !== 0) {
//         prev.style.display = "flex";
//     }
//     if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
//         next.style.display = "none";
//     }
// });
// prev.addEventListener("click", e => {
//     carousel.scrollBy(-(width + gap), 0);
//     if (carousel.scrollLeft - width - gap <= 0) {
//         prev.style.display = "none";
//     }
//     if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
//         next.style.display = "flex";
//     }
// });

// let width = carousel.offsetWidth;
// window.addEventListener("resize", e => (width = carousel.offsetWidth));
