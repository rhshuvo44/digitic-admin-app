import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategorys } from "../features/category/categorySlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
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
    title: "Action",
    dataIndex: "action",
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
      action: (
        <>
          <Link to={`/admin/category/${categoryState[i]._id}`}>
            <BiEdit
              className="text-success fs-5 me-2"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <AiFillDelete
            className="text-danger fs-5"
            style={{ cursor: "pointer" }}
          />
        </>
      ),
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
