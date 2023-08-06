import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import {
  createCoupons,
  getACoupon,
  resetState,
  updateCoupons,
} from "../features/coupon/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";
let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount is Required"),
});
const AddCoupon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getCouponIt = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupons,
    updatedCoupons,
    couponName,
  } = newCoupon;
  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };
  useEffect(() => {
    if (getCouponIt !== undefined) {
      dispatch(getACoupon(getCouponIt));
    } else {
      dispatch(resetState());
    }
  }, [getCouponIt, dispatch]);
  useEffect(() => {
    if (isSuccess && createdCoupons) {
      toast.success("Coupon Added Successfullly!");
    }
    if (isSuccess && updatedCoupons) {
      toast.success("Coupon update Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCoupons, updatedCoupons]);

  const expiry = couponName?.getaCoupon?.expiry;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName?.getaCoupon?.name || "",
      expiry: changeDateFormet(expiry) || "",
      discount: couponName?.getaCoupon?.discount || "",
    },

    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponIt !== undefined) {
        const data = { id: getCouponIt, couponData: values };
        dispatch(updateCoupons(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupons(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/coupon-list");
      }, 3000);
    },
  });
  return (
    <section>
      <h3 className="mb-4 title">
        {getCouponIt !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          name="name"
          id="name"
          label="Coupon Name"
          placeholder="Coupon Name"
          val={formik.values.name}
          onCh={formik.handleChange("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="my-2 error">{formik.errors.name}</div>
        ) : null}
        <CustomInput
          type="date"
          name="expiry"
          id="expiry"
          label="Expiry"
          placeholder="Expiry"
          val={formik.values.expiry}
          onCh={formik.handleChange("expiry")}
        />
        {formik.touched.expiry && formik.errors.expiry ? (
          <div className="my-2 error">{formik.errors.expiry}</div>
        ) : null}
        <CustomInput
          type="number"
          name="discount"
          id="discount"
          label="Discount"
          placeholder="Discount"
          val={formik.values.discount}
          onCh={formik.handleChange("discount")}
        />
        {formik.touched.discount && formik.errors.discount ? (
          <div className="my-2 error">{formik.errors.discount}</div>
        ) : null}
        <button type="submit" className="btn border-0 my-5 btn-success">
          {getCouponIt !== undefined ? "Edit" : "Add"} Coupon
        </button>
      </form>
    </section>
  );
};

export default AddCoupon;
