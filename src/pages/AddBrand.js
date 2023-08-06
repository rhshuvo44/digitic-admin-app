import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createBrands,
  getABrand,
  resetState,
  updateBrands,
} from "../features/brand/brandSlice";

import * as yup from "yup";
import CustomInput from "../components/CustomInput";
let schema = yup.object().shape({
  title: yup.string().required("Brand is Required"),
});
const AddBrand = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getBrandIt = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrands,
    brandName,
    updatedBrand,
  } = newBrand;

  useEffect(() => {
    if (getBrandIt !== undefined) {
      dispatch(getABrand(getBrandIt));
    } else {
      dispatch(resetState());
    }
  }, [getBrandIt, dispatch]);

  useEffect(() => {
    if (isSuccess && createdBrands) {
      toast.success("Brand Added Successfullly!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand update Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBrands, updatedBrand]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName?.getaBrand?.title || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandIt !== undefined) {
        const data = { id: getBrandIt, brandData: values };
        dispatch(updateBrands(data));
        dispatch(resetState());
      } else {
        dispatch(createBrands(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/brand-list");
      }, 3000);
    },
  });
  return (
    <section>
      <h3 className="mb-4 title">
        {getBrandIt !== undefined ? "Edit" : "Add"} Brand
      </h3>
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
          {getBrandIt !== undefined ? "Edit" : "Add"} Brand
        </button>
      </form>
    </section>
  );
};

export default AddBrand;
