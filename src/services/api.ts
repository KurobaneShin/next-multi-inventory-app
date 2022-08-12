import axios, { AxiosError } from 'axios';

const baseURL = '/api/';

const api = axios.create({ baseURL });

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error as AxiosError;
    switch (response?.status) {
      case 401: {
        // window.location.replace('/'); //* reload app to logout

        //! if the error is a 401 and not is login path, logout
        // if (!window.location.hash.includes(ROUTES.AUTH_LOGIN_PATH)) {
        //   setSession(null);
        // } else {
        //   throw new ApiError(response, response?.data);
        // }
        break;
      }
      case 400:
      case 404:
      case 500:
      default:
      // throw new AxiosError(response);
    }
  }
);

export default api;
