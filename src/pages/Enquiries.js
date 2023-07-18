import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnduiries } from "../features/enquiries/enduirieSlice";
import { AiFillDelete } from "react-icons/ai";
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
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    sorter: (a, b) => a.name.length - b.name.length,
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
    dispatch(getEnduiries());
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
