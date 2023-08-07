import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  createCategory,
  getACategory,
  resetState,
  updateCategorys,
} from "../features/category/categorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category is Required"),
});
const AddCat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getCatIt = location.pathname.split("/")[3];
  useEffect(() => {
    if (getCatIt !== undefined) {
      dispatch(getACategory(getCatIt));
    } else {
      dispatch(resetState());
    }
  }, [getCatIt, dispatch]);
  const newCategory = useSelector((state) => state.category);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    updatedCategory,
    categoryName,
  } = newCategory;

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfullly!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category update Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCategory, updatedCategory]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName?.getCategory?.title || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCatIt !== undefined) {
        const data = { id: getCatIt, catData: values };
        dispatch(updateCategorys(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/category-list");
      }, 3000);
    },
  });
  return (
    <section>
      <h3 className="mb-4 title">
        {getCatIt !== undefined ? "Edit" : "Add"} Product Category
      </h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          name="title"
          id="title"
          label="Category"
          placeholder="Category"
          val={formik.values.title}
          onCh={formik.handleChange("title")}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="my-2 error">{formik.errors.title}</div>
        ) : null}
        <button type="submit" className="btn border-0 my-5 btn-success">
          {getCatIt !== undefined ? "Edit" : "Add"} Category
        </button>
      </form>
    </section>
  );
};

export default AddCat;
