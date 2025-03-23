import { fetchPhotos } from "./js/pixabay-api.js";
import { clearGallery, renderPhotos } from "./js/render-functions.js";

function handleSearch(event) {
  event.preventDefault();
  
  const inputValue = document.querySelector("input[name='search-text']").value.trim();
  if (!inputValue) return;

  
  const loader = document.querySelector(".loader")

  
  clearGallery();
  loader.style.display = 'inline-block';

  fetchPhotos(inputValue)
    .then(photos => {
      renderPhotos(photos);
      loader.style.display = 'none';
    })
    .catch(error => {
      console.error("Error:", error);
      loader.style.display = 'none';
    });
}
document.querySelector("form").addEventListener("submit", handleSearch);

