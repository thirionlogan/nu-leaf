const axios = require('axios');
const API_SERVER = process.env.API_SERVER || 'http://localhost:3001/api';

const instance = axios.create({
  withCredentials: true,
  baseURL: API_SERVER,
});

module.exports = {
  registerUser: ({ email, firstName, lastName, password, confirmPassword }) =>
    instance.post('/register', {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    }),
  loginClient: ({ email, password }) =>
    instance.post('/login', {
      email,
      password,
    }),
  logoutClient: () => instance.post('/logout'),
};
