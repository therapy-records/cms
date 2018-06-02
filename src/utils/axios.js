import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': localStorage.getItem('token') // eslint-disable-line no-undef
}

const _axiosAuthHeaders = axios.create({
  headers: headers
});

export default _axiosAuthHeaders;
