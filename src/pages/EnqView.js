import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAEnquirie } from "../features/enquiries/enquirieSlice";

const EnqView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getEnqIt = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getAEnquirie(getEnqIt));
  }, [dispatch, getEnqIt]);
  const newEnq = useSelector((state) => state.enquirie);
  const { comment, email, mobile, name, status } =
    newEnq?.enquirieName?.getaEnquiry;
  const goBack = () => {
    navigate(-1);
  };
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center ">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button onClick={goBack}>Go Back</button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex flex-column gap-3 rounded-3">
        <div className="d-flex align-items-center  gap-3 ">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{name}</p>
        </div>
        <div className="d-flex align-items-center gap-3 ">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3 ">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+${mobile}`}>{mobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3 ">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{comment}</p>
        </div>
        <div className="d-flex align-items-center gap-3 ">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{status ? status : "Submitted"}</p>
        </div>
        <div className="d-flex align-items-center gap-3 ">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name=""
              defaultValue={"default"}
              id=""
              className="form-control form-select"
            >
              <option value="Submitted" selected>
                Submitted
              </option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnqView;
