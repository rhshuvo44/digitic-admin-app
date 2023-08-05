import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBrands } from "../features/brand/brandSlice";

import * as yup from "yup";
import CustomInput from "../components/CustomInput";
let schema = yup.object().shape({
  title: yup.string().required("Brand is Required"),
});
const AddBrand = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrands } = newBrand;
  useEffect(() => {
    if (isSuccess && createdBrands) {
      toast.success("Brand Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBrands]);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrands(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/brand-list");
      }, 3000);
    },
  });
  return (
    <section>
      <h3 className="mb-4 title">Add Brand</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          name="title"
          id="title"
          label="Brand"
          placeholder="Brand"
          val={formik.values.title}
          onCh={formik.handleChange("title")}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="my-2 error">{formik.errors.title}</div>
        ) : null}
        <button type="submit" className="btn border-0 my-5 btn-success">
          Add Brand
        </button>
      </form>
    </section>
  );
};

export default AddBrand;
