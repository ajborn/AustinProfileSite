import axios from 'axios';
import { getAccessToken } from './AuthService';

const BASE_URL = 'http://localhost:3333';

export { getAboutMeData };

function getAboutMeData() {
  const url = `${BASE_URL}/api/profile/aboutme`;
  return axios.get(url).then(response => response.data);
}