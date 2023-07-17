import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
];

const BrandList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  const brandState = useSelector((state) => state?.brand?.brands?.getallBrand);
  const data = [];
  for (let i = 0; i < brandState?.length; i++) {
    data.push({
      key: i + 1,
      name: brandState[i].title,
    });
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
