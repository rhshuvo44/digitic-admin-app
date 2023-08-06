import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../features/blog/blogSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
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
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const showModal = (id) => {
    setOpen(true);
    setBlogId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);
  const blogsState = useSelector((state) => state?.blog?.blogs);
  const data = [];
  for (let i = 0; i < blogsState?.length; i++) {
    data.push({
      key: i + 1,
      name: blogsState[i].title,
      category: blogsState[i].category,
      action: (
        <>
          <Link to={`/admin/blog/${blogsState[i]._id}`}>
            <BiEdit
              className="text-success fs-5 me-2"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <button
            onClick={() => showModal(blogsState[i]._id)}
            className="bg-transparent border-0 text-danger fs-5"
            style={{ cursor: "pointer" }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBlogs = (id) => {
    dispatch(deleteBlog(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 1000);
  };
  return (
    <section>
      <h3 className="mb-4 title">Blog List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        performAction={() => deleteBlogs(blogId)}
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this brand?"
      />
    </section>
  );
};

export default BlogList;
