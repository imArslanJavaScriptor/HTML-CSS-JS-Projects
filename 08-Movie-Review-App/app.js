const apiKey = "f2fc5cb4"; // Replace with your OMDb API key
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const movieResults = document.getElementById("movieResults");
const reviewModal = document.getElementById("reviewModal");
const movieTitle = document.getElementById("movieTitle");
const reviewInput = document.getElementById("reviewInput");
const submitReview = document.getElementById("submitReview");
const closeModal = document.getElementById("closeModal");

let currentMovieId = null;
let reviews = JSON.parse(localStorage.getItem("reviews")) || {};

// Fetch movies from OMDb API
async function fetchMovies(query) {
  const response = await fetch(
    `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
  );
  const data = await response.json();

  if (data.Response === "True") {
    displayMovies(data.Search);
  } else {
    movieResults.innerHTML = "<p>No movies found!</p>";
  }
}

// Display movies in the grid
function displayMovies(movies) {
  movieResults.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    movieCard.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button onclick="openReviewModal('${movie.imdbID}', '${movie.Title}')">Add Review</button>
    `;

    movieResults.appendChild(movieCard);
  });
}

// Open the review modal
function openReviewModal(id, title) {
  currentMovieId = id;
  movieTitle.textContent = title;
  reviewInput.value = reviews[id] || "";
  reviewModal.classList.remove("hidden");
}

// Close the review modal
closeModal.addEventListener("click", () => {
  reviewModal.classList.add("hidden");
});

// Save review
submitReview.addEventListener("click", () => {
  const review = reviewInput.value.trim();

  if (review) {
    reviews[currentMovieId] = review;
    localStorage.setItem("reviews", JSON.stringify(reviews));
    alert("Review saved!");
    reviewModal.classList.add("hidden");
  } else {
    alert("Please write a review before submitting.");
  }
});

// Search movies
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (query) {
    fetchMovies(query);
  } else {
    alert("Please enter a search term.");
  }
});
