import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategorys } from "../features/category/categorySlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];


const BrandList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategorys());
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
      <h3 className="mb-4 title">Brand List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </section>
    );
};

export default BrandList;