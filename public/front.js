// Function to display movie data on the frontend
function displayData(movies) {
    const container = document.querySelector(".Showing");
    container.innerHTML = "";

    movies.forEach(item => {
        const dataItem = document.createElement("div");
        dataItem.classList.add('movie');
        
        const imgSrc = item.poster_path
            ? `https://image.tmdb.org/t/p/w185/${item.poster_path}`
            : 'placeholder.jpg';

        dataItem.innerHTML = `
            <img src="${imgSrc}" alt="${item.original_title} Poster">
            <h1>${item.original_title}</h1>
        `;
        container.appendChild(dataItem);
    });
}


// Function to fetch movie data based on user search query
//passing through three parameters to allow user to select by title,actor or genre
async function searchAndDisplayMovie(movieName, actor, genre) {
    try {
        // Construct URL with query parameters
        //creates a custom url based on how the suer chooses to search
        let url = `/api/search?movieName=${movieName}`;
        if (actor) {
            url += `&actor=${actor}`;
        }
        if (genre) {
            url += `&genre=${genre}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch movie data");
        }
        const movieData = await response.json();
        displayData(movieData); 
    } catch (error) {
        console.error("Error fetching movie data:", error.message);
    }
}


// Add event listener to the search form submission
document.getElementById("searchForm").addEventListener("submit", event => {
    event.preventDefault(); // Prevents default form submission behavior
    const searchQuery = document.getElementById("search").value.trim();
    if (searchQuery === "") return; // Exit early if searchQuery is empty
    searchAndDisplayMovie(searchQuery);
});

