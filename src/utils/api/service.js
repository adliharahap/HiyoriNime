import { createApiClient } from './apiClient';
import routes from './routes';

const fetchData = async (endpoint, params = {}, source = 'samehadaku') => {
  try {
    const apiClient = createApiClient(source);
    const response = await apiClient.get(endpoint, {
      params: { page: 1, ...params },
    });
    return response.data;
  } catch (error) {
    console.log(`❌ Error fetching ${endpoint} from ${source}:`, error);
    throw error;
  }
};

export const fetchHome = (source) => fetchData(routes[source].home, {}, source);
export const fetchGenres = (source) => fetchData(routes[source].genres, {}, source);
export const fetchAllAnime = (page = 1, source) => fetchData(routes[source].anime, { page }, source);
export const fetchSchedule = (source) => fetchData(routes[source].schedule, {}, source);
export const fetchOngoing = (page = 1, source) => fetchData(routes[source].ongoing, { page }, source);
export const fetchCompleted = (page = 1, source) => fetchData(routes[source].completed, { page }, source);
export const searchAnime = (query, page = 1, source) => fetchData(routes[source].search, { q: query, page }, source);
export const fetchByGenre = (genreId, page = 1, source) => fetchData(routes[source].byGenre(genreId), { page }, source);
export const fetchAnimeDetail = (animeId, source) => fetchData(routes[source].detail(animeId), {}, source);
export const fetchEpisode = (episodeId, source) => fetchData(routes[source].episode(episodeId), {}, source);
export const fetchServer = (serverId, source) => fetchData(routes[source].server(serverId), {}, source);
export const fetchBatchDetail = (batchId, source) => fetchData(routes[source].batchDetail(batchId), {}, source);

// Optional (kalau cuma Samehadaku yang punya)
export const fetchPopular = (page = 1, source) =>
  source === 'samehadaku' ? fetchData(routes[source].popular, { page }, source) : null;
export const fetchMovies = (page = 1, source) =>
  source === 'samehadaku' ? fetchData(routes[source].movies, { page }, source) : null;
export const fetchRecent = (page = 1, source) =>
  source === 'samehadaku' ? fetchData(routes[source].recent, { page }, source) : null;
export const fetchBatch = (page = 1, source) =>
  source === 'samehadaku' ? fetchData(routes[source].batch, { page }, source) : null;
