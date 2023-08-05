import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import { createColor, resetState } from "../features/color/colorSlice";
let schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});

const AddColor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor } = newColor;
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor]);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());

        navigate("/admin/color-list");
      }, 3000);
    },
  });
  return (
    <section>
      <h3 className="mb-4 title">Add Color</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="color"
          name="title"
          id="title"
          label="Color"
          placeholder="Color"
          val={formik.values.title}
          onCh={formik.handleChange("title")}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="my-2 error">{formik.errors.title}</div>
        ) : null}
        <button type="submit" className="btn border-0 my-5 btn-success">
          Add Color
        </button>
      </form>
    </section>
  );
};

export default AddColor;
