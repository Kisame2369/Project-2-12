import axios from "axios";

const API_KEY = "49472693-e26774e5dc97a1dde6aa5a0a9";
const BASE_URL = "https://pixabay.com/api/";

export function fetchPhotos(query) {
  return axios.get(`${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => response.data.hits)
    .catch(error => {
      console.error("Error:", error);
      throw error;
    });
}


