import { Table } from "antd";
import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategorys } from "../features/bCategory/bCategorySlice";
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
const BlogCategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogCategorys());
  }, [dispatch]);
  const bCategoryState = useSelector(
    (state) => state?.bCategory?.bCategorys?.getallBlogCategory
  );
  const data = [];
  for (let i = 0; i < bCategoryState?.length; i++) {
    data.push({
      key: i + 1,
      name: bCategoryState[i].title,
      action: (
        <>
          <Link to={`/admin/blog-category/${bCategoryState[i]._id}`}>
            <BiEdit
              className="text-success fs-5 me-2"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <button
            // onClick={() => showModal(bCategoryState[i]._id)}
            className="bg-transparent border-0 text-danger fs-5"
            style={{ cursor: "pointer" }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  return (
    <section>
      <h3 className="mb-4 title">Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </section>
  );
};

export default BlogCategoryList;
