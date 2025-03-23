import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const btn = document.querySelector(".btn");
let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showErrorMessage() {
  iziToast.show({
    title: "Error",
    message: "Sorry, there are no images matching your search query. Please try again!",
    position: "topRight",
    color: "red"
  });
}

export function renderPhotos(photos) {
  if (photos.length === 0) {
    showErrorMessage();
    return;
  }

  const markup = photos
    .map(photo => `
      <li class="gallery-item">
        <a class="gallery-link" href="${photo.largeImageURL}">
          <img class="gallery-image" src="${photo.webformatURL}" alt="${photo.tags}" />
        </a>
        <div class="gallery-info">
          <div><p>Likes</p><p>${photo.likes}</p></div>
          <div><p>Views</p><p>${photo.views}</p></div>
          <div><p>Comments</p><p>${photo.comments}</p></div>
          <div><p>Downloads</p><p>${photo.downloads}</p></div>
        </div>
      </li>
    `)
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();

  smoothScroll() 
}

function smoothScroll() {
  const firstCard = document.querySelector(".gallery-item");
  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  }
}