import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupons, getAllCoupon } from "../features/coupon/couponSlice";
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
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const showModal = (id) => {
    setOpen(true);
    setCouponId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
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
          <Link to={`/admin/coupon/${couponState[i]._id}`}>
            <BiEdit
              className="text-success fs-5 me-2"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <button
            onClick={() => showModal(couponState[i]._id)}
            className="bg-transparent border-0 text-danger fs-5"
            style={{ cursor: "pointer" }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteCoupon = (id) => {
    dispatch(deleteCoupons(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllCoupon());
    }, 1000);
  };
  return (
    <section>
      <h3 className="mb-4 title">Brand List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        performAction={() => deleteCoupon(couponId)}
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this Coupon?"
      />
    </section>
  );
};

export default CouponList;
