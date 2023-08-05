import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import { createCoupons, resetState } from "../features/coupon/couponSlice";
let schema = yup.object().shape({
  title: yup.string().required("Brand is Required"),
});
const AddCoupon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupons } = newCoupon;
  useEffect(() => {
    if (isSuccess && createdCoupons) {
      toast.success("Coupon Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCoupons]);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCoupons(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());

        navigate("/admin/coupon-list");
      }, 3000);
    },
  });
  return (
    <section>
      <h3 className="mb-4 title">Add Coupon</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          name="title"
          id="title"
          label="Coupon"
          placeholder="Coupon"
          val={formik.values.title}
          onCh={formik.handleChange("title")}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="my-2 error">{formik.errors.title}</div>
        ) : null}
        <button type="submit" className="btn border-0 my-5 btn-success">
          Add Coupon
        </button>
      </form>
    </section>
  );
};

export default AddCoupon;
