const slidePreviousButton = document.querySelector(".slider__previous-button");
const slideNextButton = document.querySelector(".slider__next-button");
const slideFirst = document.querySelector(".slide_first");
const slideSecond = document.querySelector(".slide_second");


slidePreviousButton.onclick = function() {
slideFirst.classList.toggle("slide_visible");
slideSecond.classList.toggle("slide_visible");
};

slideNextButton.onclick = function() {
slideFirst.classList.toggle("slide_visible");
slideSecond.classList.toggle("slide_visible");
};




