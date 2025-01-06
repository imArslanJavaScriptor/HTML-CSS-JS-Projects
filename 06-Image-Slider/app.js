const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = 0;

// Function to update the slide position
function updateSlidePosition() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Event listeners for next and previous buttons
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slide.length; // Loop to the start
  updateSlidePosition();
});

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slide.length) % slide.length; // Loop to the end
  updateSlidePosition();
});
