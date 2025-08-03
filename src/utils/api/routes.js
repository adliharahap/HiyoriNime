// utils/api/routes.js
const routes = {
  samehadaku: {
    home: '/home',
    genres: '/genres',
    anime: '/anime',
    schedule: '/schedule',
    recent: '/recent',
    ongoing: '/ongoing',
    completed: '/completed',
    popular: '/popular',
    movies: '/movies',
    batch: '/batch',
    search: '/search',
    byGenre: (genreId) => `/genres/${genreId}`,
    detail: (animeId) => `/anime/${animeId}`,
    episode: (episodeId) => `/episode/${episodeId}`,
    server: (serverId) => `/server/${serverId}`,
    batchDetail: (batchId) => `/batch/${batchId}`,
  },
  otakudesu: {
    home: '/home',
    genres: '/genres',
    anime: '/anime',
    schedule: '/schedule',
    ongoing: '/ongoing',
    completed: '/completed',
    search: '/search',
    byGenre: (genreId) => `/genres/${genreId}`,
    detail: (animeId) => `/anime/${animeId}`,
    episode: (episodeId) => `/episode/${episodeId}`,
    server: (serverId) => `/server/${serverId}`,
    batchDetail: (batchId) => `/batch/${batchId}`,
  },
};

export default routes;
