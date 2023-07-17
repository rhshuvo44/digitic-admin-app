import axios from "axios";
import { base_url } from "../../utils/base_url";

const getCategorys = async () => {
  const response = await axios.get(`${base_url}category`);
  return response.data;
};

const categoryService = {
  getCategorys,
};
export default categoryService;
