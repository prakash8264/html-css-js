const slides = document.querySelectorAll(".slides img");
const slider = document.querySelector(".slider");

let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    if (slides.length > 0) {
        slides[slideIndex].classList.add("displaySlide");
        startSlider();

        // Pause when mouse enters the slider
        slider.addEventListener("mouseenter", stopSlider);

        // Resume when mouse leaves the slider
        slider.addEventListener("mouseleave", startSlider);
    }
}

function showSlide(index) {

    if (index >= slides.length) {
        slideIndex = 0;
    }
    else if (index < 0) {
        slideIndex = slides.length - 1;
    }
    else {
        slideIndex = index;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });

    slides[slideIndex].classList.add("displaySlide");
}

function startSlider() {
    if (intervalId === null) {
        intervalId = setInterval(nextSlide, 3000);
    }
}

function stopSlider() {
    clearInterval(intervalId);
    intervalId = null;
}

function prevSlide() {
    stopSlider();
    showSlide(slideIndex - 1);
    startSlider();
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

