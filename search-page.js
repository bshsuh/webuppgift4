import {guidePages} from './guide-pages.js';

/* Read query parameters from the URL injected by the nav-bar search */
const params = new URLSearchParams(window.location.search);
const resultsList = document.getElementById("results");
const queryText = document.getElementById("search-query");
/*
Extract the search query and convert to lowercase for case-insensitive matching. 
    Fallback to empty string if missing
*/
let query = "";
/* query will become null if get is unsuccessful, reassign as an empty string*/
if (params) query = params.get("q")?.toLowerCase() ?? "";

/* Display query status for user */
queryText.textContent = query ? `Search results for "${query}"` : `No search term provided`;

/* Filter pages whose titles contain the query */
const matches = guidePages.filter(page =>
    page.title.toLowerCase().includes(query));

// Report back that no results were found
if (matches.length === 0) resultsList.innerHTML = `<li>No matching pages found.</li>`;
else {
    /* Create a hyper link in a created item for each match and add them to the list element */
    matches.forEach(page => {
        const li = document.createElement("li");
        const link = document.createElement("a");

        link.href = `guides/${page.url}`;
        link.textContent = `${page.title}`;

        li.appendChild(link);
        resultsList.appendChild(li);
    });
}
