import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pelo seu IP se estiver testando no dispositivo físico
});

export default api;