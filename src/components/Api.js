import axios from "axios";

export default axios.create({
  baseURL: `gambino-backend.herokuapp.com/api`
});
