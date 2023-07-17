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
    sorter: (a, b) => a.name.length - b.name.length,
  },
];

const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);
  const categoryState = useSelector(
    (state) => state?.category?.categorys?.getallCategory
  );
  const data = [];
  for (let i = 0; i < categoryState?.length; i++) {
    data.push({
      key: i + 1,
      name: categoryState[i].title,
    });
  }
  return (
    <section>
      <h3 className="mb-4 title">Category List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </section>
  );
};

export default CategoryList;
