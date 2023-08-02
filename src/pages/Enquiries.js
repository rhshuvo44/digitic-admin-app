import { Table } from "antd";
import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../features/enquiries/enquirieSlice";
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
  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);
  const enduirieState = useSelector(
    (state) => state?.enduirie?.enduiries.getallEnquiry
  );
  const data = [];
  for (let i = 0; i < enduirieState?.length; i++) {
    data.push({
      key: i + 1,
      name: enduirieState[i].name,
      email: enduirieState[i].email,
      mobile: enduirieState[i].mobile,
      status: (
        <select name="" id="" className="form-control form-select">
          <option value="">pending</option>
        </select>
      ),
      action: (
        <AiFillDelete
          className="text-danger fs-5"
          style={{ cursor: "pointer" }}
        />
      ),
    });
  }
  return (
    <section>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </section>
  );
};

export default Enquiries;
