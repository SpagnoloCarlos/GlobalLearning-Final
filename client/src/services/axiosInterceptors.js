import axios from 'axios';
const commonAxios = axios.create();

const getLocalToken = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return token;
};

const getLocalUsername = () => {
  const username = JSON.parse(localStorage.getItem('username'));
  return username;
};

export const requestInterceptor = () => {
  axios.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${getLocalToken()}`;
    return config;
  });
};

export const responseInterceptor = () => {
  axios.interceptors.response.use(
    async (res) => {
      const refresh = await commonAxios.post(
        `${process.env.REACT_APP_API_URL}/api/users/refresh-token`,
        {
          username: getLocalUsername(),
        }
      );

      localStorage.setItem('token', JSON.stringify(refresh.data));

      return res;
    },
    (err) => {
      if (err.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location = `http://localhost:3000/login`;
      }
    }
  );
};
