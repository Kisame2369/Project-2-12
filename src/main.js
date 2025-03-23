import { fetchPhotos } from "./js/pixabay-api.js";
import { clearGallery, renderPhotos } from "./js/render-functions.js";

export let page = 1;
export let limit = 15;
let searchQuery = "";
let totalPages = 1;

const btn = document.querySelector(".btn");
const loader = document.querySelector(".loader");

async function handleSearch(event) {
  event.preventDefault();
  
  searchQuery = document.querySelector("input[name='search-text']").value.trim();
  if (!searchQuery) return;

  clearGallery();
  loader.style.display = "inline-block";
  btn.style.display = "none";

  try {
    page = 1;
    const response = await fetchPhotos(searchQuery, page);
    renderPhotos(response.photos);
    totalPages = Math.ceil(response.totalHits / limit);
    btn.style.display = response.totalHits > limit ? "inline-block" : "none";
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loader.style.display = "none";
  }
}

document.querySelector("form").addEventListener("submit", handleSearch);

btn.addEventListener("click", async () => {

  try {
    page += 1; 
    const response = await fetchPhotos(searchQuery, page);
    renderPhotos(response.photos);

    if (page >= totalPages) {
      iziToast.error({
        position: "topRight",
        message: "We're sorry, but you've reached the end of search results.",
      });
      btn.style.display = "none";
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
