import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
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
      action: (
        <>
          <Link to={`/admin/brand/${brandState[i]._id}`}>
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
      <h3 className="mb-4 title">Brand List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </section>
  );
};

export default BrandList;
