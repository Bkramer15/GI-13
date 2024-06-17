import express from 'express';
import fetch from 'node-fetch';


const app = express();
app.set('view engine','hbs');
const port = 8080;


// Middleware for parsing JSON and URL encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'))
//app.use(express.static(__dirname,"public"));

async function searchMovie(movieName) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzlhYmE4OGEwMDQ4ZTBmYzE0YjM5MWVmNDNkYzVkYyIsInN1YiI6IjY2Njc3YjU3ZjlkNjI5MGE0YmRkYjRiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GGAEPoLKmJ9MhcDCtGAHOWrxv9CFOSgUUAA3eFDJ_xk'
    }
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("An error occurred while fetching the data");
  }

  const json = await res.json();
  return json.results;//returns all movies instead of the first one
}

//get endpoint for client side 
app.get('', async (req,res) =>{
  res.render('index',{movies: []});//initalize empty array of movies until one has been searched
})

// GET endpoint to search for a movie based on user input
app.get('/api/search', async (req, res) => {
  try {
      const { movieName } = req.query; // Get the movie name from the user input
      if (!movieName) {
          throw new Error("Movie name is required");
      }

      const movieData = await searchMovie(movieName); // Search based on user input

      // Check if movieData is empty
      if (movieData.length === 0) {
          console.log(`No movies found for ${movieName}`);
          // You can choose to render an error message or handle this case as needed
          res.render('index', { movies: [] });
      } else {
          res.render('index', { movies: movieData }); // Passes all movies to the template
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
