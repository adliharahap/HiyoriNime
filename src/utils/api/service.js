import axios from 'axios';
import { API_BASE_URL, API_KEY } from '@env';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: API_KEY,
  },
});

/**
 * Fungsi untuk melakukan GET request ke API.
 * @param {string} endpoint - Endpoint API (contoh: "/popular").
 * @param {object} params - Parameter tambahan (opsional).
 * @returns {Promise} - Data dari API.
 */
const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, {
      params: { page: 1, ...params }, // Default page = 1
    });
    return response.data;
  } catch (error) {
    console.log(`❌ Error fetching ${endpoint}:`, error);
    throw error;
  }
};

// 🔥 Fungsi-fungsi siap pakai untuk API 🔥
export const fetchHome = () => fetchData('/home');
export const fetchGenres = () => fetchData('/genres');
export const fetchAllAnime = (page = 1) => fetchData('/anime', { page });
export const fetchSchedule = () => fetchData('/schedule');
export const fetchRecent = (page = 1) => fetchData('/recent', { page });
export const fetchOngoing = (page = 1, order = 'title') => fetchData('/ongoing', { page, order });
export const fetchCompleted = (page = 1, order = 'title') => fetchData('/completed', { page, order });
export const fetchPopular = (page = 1) => fetchData('/popular', { page });
export const fetchMovies = (page = 1) => fetchData('/movies', { page });
export const fetchBatch = (page = 1) => fetchData('/batch', { page });
export const searchAnime = (query, page = 1) => fetchData('/search', { q: query, page });
export const fetchByGenre = (genreId, page = 1) => fetchData(`/genres/${genreId}`, { page });
export const fetchAnimeDetail = (animeId) => fetchData(`/anime/${animeId}`);
export const fetchEpisode = (episodeId) => fetchData(`/episode/${episodeId}`);
export const fetchServer = (serverId) => fetchData(`/server/${serverId}`);
export const fetchBatchDetail = (batchId) => fetchData(`/batch/${batchId}`);
