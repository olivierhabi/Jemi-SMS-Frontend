import axios from "axios";

export default axios.create({
  baseURL: `https://gambino-backend.herokuapp.com/api`
});
