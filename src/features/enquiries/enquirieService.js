import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/asios_config";

const getEnquiries = async () => {
  const response = await axios.get(`${base_url}enquiry`);
  return response.data;
};
const getEnquirie = async (id) => {
  const response = await axios.get(`${base_url}enquiry/${id}`);
  return response.data;
};
const updateEnquirie = async (enq) => {
  const response = await axios.put(
    `${base_url}enquiry/${enq?.id}`,
    { status: enq?.enqData },
    config
  );
  return response.data;
};
const deleteEnquirie = async (id) => {
  const response = await axios.delete(`${base_url}enquiry/${id}`, config);
  return response.data;
};

const enquirieService = {
  getEnquiries,
  getEnquirie,
  deleteEnquirie,
  updateEnquirie,
};
export default enquirieService;
