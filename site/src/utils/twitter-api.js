import axios from 'axios';
import { getAccessToken } from './AuthService';

const BASE_URL = 'http://localhost:3333';

export { getTwitterData };

function getTwitterData() {
  const url = `${BASE_URL}/api/twitter/data`;
  return axios.get(url).then(response => response.data);
}