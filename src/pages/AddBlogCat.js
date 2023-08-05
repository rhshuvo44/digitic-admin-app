import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import { createBlogCategory } from "../features/bCategory/bCategorySlice";
let schema = yup.object().shape({
  title: yup.string().required("Blog Category is Required"),
});
const AddBlogCat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newBCategory = useSelector((state) => state.bCategory);
  const { isSuccess, isError, isLoading, createdCategory } = newBCategory;
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Blog Category Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCategory]);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlogCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/blog-category-list");
      }, 3000);
    },
  });
  return (
    <section>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          name="title"
          id="title"
          label="Enter Blog Category"
          placeholder="Enter Blog Category"
          val={formik.values.title}
          onCh={formik.handleChange("title")}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="my-2 error">{formik.errors.title}</div>
        ) : null}
        <button type="submit" className="btn border-0 my-5 btn-success">
          Add Blog Category
        </button>
      </form>
    </section>
  );
};

export default AddBlogCat;
