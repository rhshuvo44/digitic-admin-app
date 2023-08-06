import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteACategory,
  getCategorys,
} from "../features/category/categorySlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
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

const CategoryList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [catId, setCatId] = useState("");
  const showModal = (id) => {
    setOpen(true);
    setCatId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
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
          <button
            onClick={() => showModal(categoryState[i]._id)}
            className="bg-transparent border-0 text-danger fs-5"
            style={{ cursor: "pointer" }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteCat = (id) => {
    dispatch(deleteACategory(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategorys());
    }, 1000);
  };
  return (
    <section>
      <h3 className="mb-4 title">Category List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        performAction={() => deleteCat(catId)}
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this brand?"
      />
    </section>
  );
};

export default CategoryList;
