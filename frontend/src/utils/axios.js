import axios from 'axios';

const baseURL = "https://users-47.herokuapp.com/";

const instance = axios.create({
  baseURL: baseURL
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(request => {
  return request;
},
  error => {
    // console.log(error);
    return Promise.reject(error);
  });

instance.interceptors.response.use(response => {
  return response;
},
  error => {
    // console.log(error.response);
    return Promise.reject(error);
  });

export default instance;