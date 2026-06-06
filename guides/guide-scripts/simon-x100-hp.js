const overlay = document.getElementById("overlay");
const overlayBox = document.getElementById("overlay-box");

document.querySelectorAll(".row").forEach(row => { /* Get all elements of class ".row*/
    row.addEventListener("click", () => { /* Add Event listener for each and pass the event itself */
        /* Get the text of the child element (.tooltip) of the row */
        overlayBox.textContent = row.firstElementChild.textContent;
        overlayBox.style.backgroundColor = "black";
        overlayBox.style.fontWeight = "bold";
        overlay.style.display = "flex";
    });
});

/* Remove overlay with mouse clicks */
overlay.addEventListener("click", () => {
    overlay.style.display = "none";
});
/* Remove overlay with any keyboard press*/
document.addEventListener("keydown", () => {
    if (overlay) overlay.style.display = "none";
});