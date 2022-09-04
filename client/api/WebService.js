import axios from "axios";

export default axios.create({
  //baseURL: "https://nodejs-orar-web-api.herokuapp.com/",
  baseURL: "http://192.168.0.190:8001/",
});

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = "Bearer" + token;
    }
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
