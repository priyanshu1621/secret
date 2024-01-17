import axios from 'axios';

const BASE_URL = process.env.MONGODB_URL   || 'http://localhost:4000'; // Use the environment variable or a default value

export const fetchSecrets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/secrets/get-secrets`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postSecret = async (newSecret) => {
  try {
    await axios.post(`${BASE_URL}/secrets/post-secret`, { secretMessage: newSecret });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
