import { Table } from "antd";
import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoupon } from "../features/coupon/couponSlice";
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
    title: "Expiry Date",
    dataIndex: "expiry",
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const CouponList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCoupon());
  }, [dispatch]);
  const couponState = useSelector((state) => state?.coupon.coupons);

  const data = [];
  for (let i = 0; i < couponState?.length; i++) {
    data.push({
      key: i + 1,
      name: couponState[i].name,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      discount: couponState[i].discount,
      action: (
        <>
          <BiEdit
            className="text-success fs-5 me-2"
            style={{ cursor: "pointer" }}
          />
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

export default CouponList;
