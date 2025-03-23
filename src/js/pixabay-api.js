import axios from "axios";
import { page, limit } from "../main.js";

const API_KEY = "49472693-e26774e5dc97a1dde6aa5a0a9";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchPhotos(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: limit,
    page: page
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return { photos: response.data.hits, totalHits: response.data.totalHits };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}