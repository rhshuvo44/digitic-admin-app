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
const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`, config);
  return response.data;
};
const updateBlog = async (blog) => {
  const response = await axios.put(
    `${base_url}blog/${blog.id}`,
    blog.blogData,
    config
  );
  return response.data;
};
const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/${id}`, config);
  return response.data;
};
const blogService = {
  getBlogs,
  createBlog,
  deleteBlog,
  getBlog,
  updateBlog,
};
export default blogService;
