import axios from 'axios';

const _axiosAuthHeaders = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
});

export default _axiosAuthHeaders;
