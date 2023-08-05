import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/asios_config";

const getBlogCategorys = async () => {
  const response = await axios.get(`${base_url}blogCategory`);
  return response.data;
};
const createBlogCategory = async (category) => {
  const response = await axios.post(
    `${base_url}blogCategory/`,
    category,
    config
  );

  return response.data;
};
const deleteBlogCategory = async (id) => {
  const response = await axios.post(`${base_url}blogCategory/${id}`, config);
  return response.data;
};
const bCategoryService = {
  getBlogCategorys,
  createBlogCategory,
  deleteBlogCategory,
};
export default bCategoryService;
