import axios from 'axios';
import store from '@/store';
import { router } from './router'

const apiClient = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

apiClient.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      try {
        const refreshResponse = await axios.post('/api/auth/token/refresh', {});
        
        const newAccessToken = refreshResponse.headers['authorization'].split(' ')[1];
        store.commit('setToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);

      } catch (refreshError) {
        try {
          await axios.post('/api/auth/logout', null, {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          });
        } catch (logoutError) {
          console.error('로그아웃 요청 중 오류:', logoutError);
        }

        store.commit('removeToken')
        alert('로그아웃하였습니다.');
        router.push({path: '/dailylog/login'})
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
