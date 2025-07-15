// src/services/authService.js
import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

export const signup = (userData) => axios.post(`${API}/signup`, userData);

export const login = (userData) => axios.post(`${API}/login`, userData);
