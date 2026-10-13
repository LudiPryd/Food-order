import Axios from 'axios';

const apiBaseURL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://food-test-api.vercel.app';

if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn('VITE_API_BASE_URL is not set, falling back to', apiBaseURL);
}

// In dev, requests go through the Vite proxy (see vite.config.js) to avoid CORS.
export const axiosInstance = Axios.create({
  baseURL: import.meta.env.DEV ? '' : apiBaseURL,
});
