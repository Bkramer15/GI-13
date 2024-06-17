
// Function to fetch movie data based on user search query
async function searchAndDisplayMovie(searchQuery) {
    try {
        const response = await fetch(`/api/search?movieName=${searchQuery}`);
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

