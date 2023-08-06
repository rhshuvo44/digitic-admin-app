import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogCategory,
  getBlogCategorys,
} from "../features/bCategory/bCategorySlice";
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
    title: "Action",
    dataIndex: "action",
  },
];
const BlogCategoryList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [bcatId, setBCatId] = useState("");
  const showModal = (id) => {
    setOpen(true);
    setBCatId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
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
            onClick={() => showModal(bCategoryState[i]._id)}
            className="bg-transparent border-0 text-danger fs-5"
            style={{ cursor: "pointer" }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBCat = (id) => {
    dispatch(deleteBlogCategory(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCategorys());
    }, 1000);
  };
  return (
    <section>
      <h3 className="mb-4 title">Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        performAction={() => deleteBCat(bcatId)}
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this brand?"
      />
    </section>
  );
};

export default BlogCategoryList;
