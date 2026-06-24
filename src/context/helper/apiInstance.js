import { baseUrl } from './base_url';

import axios from 'axios';

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: Date.now()
    };
  }
  return config;
});

export default api;