import axios from "axios";
import { config } from "../../utils/asios_config";
import { base_url } from "../../utils/base_url";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog`);
  return response.data;
};
const createBlog = async (blogData) => {
  const response = await axios.post(`${base_url}blog/`, blogData, config);
  return response.data;
};
const blogService = {
  getBlogs,
  createBlog,
};
export default blogService;
