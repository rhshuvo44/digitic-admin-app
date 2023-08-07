import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAEnquirie } from "../features/enquiries/enquirieSlice";
import { BiArrowBack } from "react-icons/bi";

const EnqView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getEnqIt = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getAEnquirie(getEnqIt));
  }, [dispatch, getEnqIt]);
  const newEnq = useSelector((state) => state.enquirie);
//   const { comment, email, mobile, name, status } =
//     newEnq?.enquirieName?.getaEnquiry;
  const goBack = () => {
    navigate(-1);
  };
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center ">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button className="bg-transparent border-0" onClick={goBack}>
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex flex-column gap-3 rounded-3">
        <div className="d-flex align-items-center  gap-3 ">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{newEnq?.enquirieName?.getaEnquiry?.name}</p>
        </div>
        <div className="d-flex align-items-center gap-3 ">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:${newEnq?.enquirieName?.getaEnquiry?.email}`}>{newEnq?.enquirieName?.getaEnquiry?.email}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3 ">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+${newEnq?.enquirieName?.getaEnquiry?.mobile}`}>{newEnq?.enquirieName?.getaEnquiry?.mobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3 ">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{newEnq?.enquirieName?.getaEnquiry?.comment}</p>
        </div>
        <div className="d-flex align-items-center gap-3 ">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{newEnq?.enquirieName?.getaEnquiry?.status}</p>
        </div>
      </div>
    </section>
  );
};

export default EnqView;
