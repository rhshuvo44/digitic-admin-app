import { useFormik } from "formik";
import React, { useEffect } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import { getBlogCategorys } from "../features/bCategory/bCategorySlice";
import {
  createBlog,
  getABlog,
  resetState,
  updateBlog,
} from "../features/blog/blogSlice";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});
const AddBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogIt = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogCategorys());
  }, [dispatch]);

  const imagesState = useSelector((state) => state?.upload?.images);
  const blogCategoryState = useSelector(
    (state) => state?.bCategory?.bCategorys?.getallBlogCategory
  );
  const newBlog = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog, updatedBlog, blogName } =
    newBlog;
  
  useEffect(() => {
    if (getBlogIt !== undefined) {
      dispatch(getABlog(getBlogIt));
    } else {
      dispatch(resetState());
    }
  }, [getBlogIt, dispatch]);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfullly!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog update Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBlog, updatedBlog]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName?.title || "",
      description: blogName?.description || "",
      category: blogName?.category || "",
      image: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogIt !== undefined) {
        const data = { id: getBlogIt, blogData: values };
        dispatch(updateBlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlog(values));
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-list");
      }, 3000);
    },
  });
  const img = [];
  imagesState?.forEach((i, j) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.image = img;
  }, [formik.values, img]);
  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogIt !== undefined ? "Edit" : "Add"} Blog
      </h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="mt-4">
          <CustomInput
            type="text"
            name="title"
            id="title"
            label="Enter Blog Title"
            placeholder="Enter Blog Title"
            val={formik.values.title}
            onCh={formik.handleChange("title")}
          />
        </div>
        {formik.touched.title && formik.errors.title ? (
          <div className="my-2 error">{formik.errors.title}</div>
        ) : null}
        <select
          name="category"
          id="category"
          className="form-control py-3 mb-3"
          value={formik.values.category}
          onChange={formik.handleChange("category")}
        >
          <option value="" disabled>
            Select category
          </option>
          {blogCategoryState?.map((n) => (
            <option key={n._id} value={n.title}>
              {n.title}
            </option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category ? (
          <div className="my-2 error">{formik.errors.category}</div>
        ) : null}

        <ReactQuill
          theme="snow"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange("description")}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="my-2 error">{formik.errors.description}</div>
        ) : null}
        <div className="bg-white border-1 text-center p-5 mt-5">
          <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input name="image" {...getInputProps()} />
                  <p style={{ cursor: "pointer" }}>
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="showimg mt-5 d-flex flex-wrap gap-3">
          {imagesState?.map((i, j) => (
            <div key={j} className="position-relative">
              <button
                type="button"
                className="btn-close position-absolute"
                onClick={() => dispatch(delImg(i.public_id))}
                style={{ top: "4px", right: "4px", cursor: "pointer" }}
              ></button>
              <img src={i.url} alt="" width={200} height={200} />
            </div>
          ))}
        </div>
        <button type="submit" className="btn border-0 my-5 btn-success">
          {getBlogIt !== undefined ? "Edit" : "Add"} Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
