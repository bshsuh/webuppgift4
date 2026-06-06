import {guidePages} from './guide-pages.js';
const searchInput = document.getElementById("search-navbar");
const resultsList = document.getElementById("nav-search-results");

searchInput.addEventListener("input", searchSuggestions);
searchInput.addEventListener("keydown", (e) => searchPage(e));
const urlDepth = getCallerDepth();

// Set up url prefix from the calling html's path. 
// Pages with no depth meta are treated as root level callers
function getCallerDepth()
{
    const strDepth = (document.querySelector('meta[name="depth"]')?.content) ?? "0";
    const intDepth = parseInt(strDepth);
    let depth = "";
    let i = 0;
    // Add ../ per depth level
    while (i < intDepth) 
    {
        depth += "../";
        i++;
    }
    return depth; 
}

function searchSuggestions()  {
    // Reset results list from any previous suggestions
    resultsList.innerHTML = "";
    // Disregard on values that are less than 3 characters
    if (searchInput.value.trim().length < 3) return;
    // Filter out unmatched guide pages
    const matches = filterQuery();
    // Create one list item per match as a suggestion that goes directly to the page on click
    for (const match of matches) 
        resultsList.appendChild(matchToItem(match));
}

function filterQuery() {
    // Normalize user input
    const query = searchInput.value.trim().toLowerCase();
    // Apply Filter to all guide pages and return matching queries
    return guidePages.filter(page => isMatching(page, query));
}

// Check user input matches with the pages
function isMatching(page, query) { 
    return page.title.toLowerCase().includes(query); 
}

function matchToItem(match) {
    // Create result as list item with the matching title as the value 
    const li = document.createElement("li");
    li.textContent = match.title;
    // Add event listeners that navigates to the resulting pages on click
    li.addEventListener("click", () => loadNewPage(match));
    return li;
}

// Replace current url with given url
function loadNewPage(page) {
    console.log(page.url);
    window.location.href = `${urlDepth}guides/${page.url}`;
}

function searchPage(e) {
    // Only react to Enter
    if (e.key !== "Enter") return;
    // Prevent page reload
    e.preventDefault();
    // Reset results list from any previous suggestions
    resultsList.innerHTML = "";  
    // go to the search results page
    window.location.href = `${urlDepth}search-page.html?q=${encodeURIComponent(searchInput.value)}`;
}
