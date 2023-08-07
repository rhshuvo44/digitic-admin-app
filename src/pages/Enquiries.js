import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEnquiries,
  getEnquiries,
  updateEnquiries,
} from "../features/enquiries/enquirieSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enqtId, setenqtId] = useState("");
  const showModal = (id) => {
    setOpen(true);
    setenqtId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);
  const enquirieState = useSelector(
    (state) => state?.enquirie?.enquiries.getallEnquiry
  );
  const data = [];
  for (let i = 0; i < enquirieState?.length; i++) {
    data.push({
      key: i + 1,
      name: enquirieState[i].name,
      email: enquirieState[i].email,
      mobile: enquirieState[i].mobile,
      status: (
        <select
          name=""
          defaultValue={
            enquirieState[i].status ? enquirieState[i].status : "Submitted"
          }
          onChange={(e) => setEnqStatus(e.target.value, enquirieState[i]._id)}
          id=""
          className="form-control form-select"
        >
          <option value="Submitted">Submitted</option>
          <option value="Contacted">Contacted</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      ),
      action: (
        <>
          <Link
            to={`/admin/enquiries/${enquirieState[i]._id}`}
            className="text-danger fs-5"
            style={{ cursor: "pointer" }}
          >
            <AiOutlineEye />
          </Link>
          <button
            onClick={() => showModal(enquirieState[i]._id)}
            className="bg-transparent border-0 text-danger fs-5"
            style={{ cursor: "pointer" }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const setEnqStatus = (status, id) => {
    const data = {
      id: id,
      enqData: status,
    };
    dispatch(updateEnquiries(data));
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 1000);
  };
  const deleteEnquirie = (id) => {
    dispatch(deleteEnquiries(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 1000);
  };
  return (
    <section>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        performAction={() => deleteEnquirie(enqtId)}
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this product?"
      />
    </section>
  );
};

export default Enquiries;
