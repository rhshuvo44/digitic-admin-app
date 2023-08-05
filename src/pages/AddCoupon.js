import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import { createCoupons, resetState } from "../features/coupon/couponSlice";
let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount is Required"),
});
const AddCoupon = () => {
  // const navigate = useNavigate();
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
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(createCoupons(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        // navigate("/admin/coupon-list");
      }, 3000);
    },
  });
  return (
    <section>
      <h3 className="mb-4 title">Add Coupon</h3>
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
          Add Coupon
        </button>
      </form>
    </section>
  );
};

export default AddCoupon;
