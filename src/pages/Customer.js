import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";
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
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const customerState = useSelector((state) => state.customer.customers);
  const data = [];
  for (let i = 0; i < customerState.length; i++) {
    if (customerState[i].role === "admin") {
      data.push({
        key: i + 1,
        name: customerState[i].firstname + " " + customerState[i].lastname,

        email: customerState[i].email,
        mobile: customerState[i].mobile,
      });
    }
  }
  return (
    <section>
      <h3 className="mb-4 title">Customers List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </section>
  );
};

export default Customer;
