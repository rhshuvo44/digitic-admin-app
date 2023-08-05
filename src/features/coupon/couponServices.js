import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/asios_config";

const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/`, config);
  return response.data;
};
const createCoupon = async (couponData) => {
  const response = await axios.post(`${base_url}coupon/`, couponData, config);

  return response.data;
};
const couponService = {
  getCoupons,
  createCoupon,
};
export default couponService;
