import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('token')
}

const _axiosAuthHeaders = axios.create({
  headers: headers
});

export default _axiosAuthHeaders;
