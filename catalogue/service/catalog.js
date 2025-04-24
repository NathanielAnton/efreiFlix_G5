import axios from 'axios';

const API_URL = 'http://localhost:2066';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = async () => {
  try {
    const response = await apiClient.get('/movies');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
