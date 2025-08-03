// utils/api/apiClient.js
import axios from 'axios';
import { API_BASE_URL, API_KEY } from '@env';

/**
 * Fungsi pembuat instance Axios berdasarkan sumber (samehadaku / otakudesu)
 * @param {string} source - Nama source ('samehadaku' atau 'otakudesu')
 * @returns {AxiosInstance}
 */
export const createApiClient = (source = 'samehadaku') => {
  return axios.create({
    baseURL: `${API_BASE_URL}/${source}`,
    headers: {
      Authorization: API_KEY,
    },
  });
};
