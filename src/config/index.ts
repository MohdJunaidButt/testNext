import axios from 'axios';
export const API_BASE_URL: string =
  process.env.NODE_ENV === 'development'
    ? process.env.BASE_URL || ''
    : process.env.NEXT_PUBLIC_PROD_API_BASE_URL || '';

export const API_SOCKET_URL: string = process.env.SOCKET_URL || '';
const instance = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
});
export const setAuthToken = (tokeen?: any, Refreshtoken?: any) => {
  try {
    const token = JSON.parse(localStorage.getItem('authContent') as string);

    if (tokeen) {
      instance.defaults.headers.common[
        'authentication'
      ] = `${token['authentication']}`;
      instance.defaults.headers.common['refresh'] = `${token['refresh']}`;
    }
    if (token && token['authentication']) {
      instance.defaults.headers.common[
        'authentication'
      ] = `${token['authentication']}`;
      instance.defaults.headers.common['refresh'] = `${token['refresh']}`;
    } else {
      delete instance.defaults.headers.common['authentication'];
      delete instance.defaults.headers.common['Refresh'];
    }
  } catch (e) {}
};
setAuthToken();
export const errorCallback = (err: any) => {
  return axios.isAxiosError(err)
    ? err?.response?.data?.message
    : 'Unexpected error : Something went wrong';
};
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error responses
    if (error.response && error.response.status === 403) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);

export default instance;
