// Array of objects that maps data series to their intended image series, image file name, alternate text and image subtitles
import {imageData} from './total-war-itemdata.js';

const rows = document.querySelectorAll(".campaign-table tr");
const currentImage = document.getElementById("current-image");
const altFallback = document.querySelector(".alt-fallback");
const subtitles = document.getElementsByClassName("subtitle");

const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const slider = document.getElementById("image-slider");

const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlay-image");

let currentSeries = null;
let currentIndex = 0;
setDefaultImage() // Default selection on page load

// Setup table's listeners
rows.forEach(row => {
    row.addEventListener("click", () => handleNewRow(row));
});
// Slider listener for image and slider updating
slider.addEventListener("input", () => {
    currentIndex = slider.value - 1;
    updateImage();
});
// Buttons listeners for image updating
previousButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateImage();
    }
});
nextButton.addEventListener("click", () => {
    const series = getSeries(currentSeries);
    // Prevent exceeding the length of the image array
    if (currentIndex < series.images.length - 1) {
        currentIndex++;
        updateImage();
    }
});

currentImage.addEventListener("click", toggleOverlay);
altFallback.addEventListener("click", toggleOverlay);
overlay.addEventListener("click", toggleOverlay);

function handleNewRow(row) {
    // Remove "selected" class from all rows
    rows.forEach(r => r.classList.remove("selected"));
    // Add "selected" class to the clicked row
    row.classList.add("selected");
    // Get clicked row's dataset-series 
    currentSeries = row.dataset.series;
    // Reset slider/buttons index
    currentIndex = 0;
    // Get approriate series object
    const series = getSeries(currentSeries);
    // Reset slider's index and set slider's max index to the number of images in the series object
    slider.max = series.images.length;
    slider.value = 1;
    updateImage();
}

// Return imageData object with the matching data series
function getSeries(series) {
    return imageData.find(s => s.dataSeries == series);
}

function updateImage() {
    if (!currentSeries) {
        console.error("Table's data-series was not found")
        return;
    }

    const series = getSeries(currentSeries); // have to call this here as well since slider and previous button do not call it
    // Get image object according to the "now should be" updated index
    const newImage = series.images[currentIndex];
    // Set the approriate image source, alternate text, image subtitles in DOM
    currentImage.src = `../images/ultimate-crisis-images/${newImage.name}`;
    currentImage.alt = newImage.alt;
    altFallback.textContent = newImage.alt;
    // Set text for all subtitle elements
    for (const subtitle of subtitles) 
        subtitle.innerHTML = newImage.subtitle;

    // Keep slider in sync with the updated image
    slider.value = currentIndex + 1;
}

// Setup first row and first image on page load. Update slider accordingly
function setDefaultImage() {
    // Get row with class "selected" already set on load
    const defaultRow = document.querySelector(".campaign-table tr.selected"); 
    currentSeries = defaultRow.dataset.series;
    slider.max = getSeries(currentSeries).images.length;
    updateImage();
}

function toggleOverlay() {
    // Hide overlay if visable
    if (overlay.style.display == "flex") 
        overlay.style.display = "none";
    else {
        // Copy current image source and alt text into the overlay image
        overlayImage.src = currentImage.src;
        overlayImage.alt = currentImage.alt;

        // Show overlay and activate flex centering
        overlay.style.display = "flex";
    }
}
