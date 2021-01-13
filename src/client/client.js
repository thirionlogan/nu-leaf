const axios = require('axios');
const API_SERVER = process.env.API_SERVER || 'http://localhost:3001/api';

const instance = axios.create({
  withCredentials: true,
  baseURL: API_SERVER,
});

module.exports = {
  ping: () => {
    return instance.get('/');
  },
};
