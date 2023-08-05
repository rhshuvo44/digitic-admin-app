import { Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import { getBrands } from "../features/brand/brandSlice";
import { getCategorys } from "../features/category/categorySlice";
import { getColors } from "../features/color/colorSlice";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  brand: yup.string().required("Brand is Required"),
  color: yup.array().required("Color is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tags is Required"),
  price: yup.number().required("Price is Required"),
  quantity: yup.number().required("Quentity is Required"),
});
const AddProduct = () => {
  const [color, setColor] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategorys());
    dispatch(getColors());
  }, [dispatch]);
  const brandState = useSelector((state) => state?.brand?.brands?.getallBrand);
  const colorState = useSelector((state) => state?.color?.colors?.getallColor);
  const imagesState = useSelector((state) => state?.upload?.images);

  const categoryState = useSelector(
    (state) => state?.category?.categorys?.getallCategory
  );
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createProduct]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      image: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());

        navigate("/admin/product-list");
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
  formik.values.color = color ? color : "";
  formik.values.image = img;
  // useEffect(() => {
  //   formik.values.color = color ? color : "";
  //   formik.values.image = img;
  // }, [formik.values, color, img]);
  const coloropt = [];
  colorState?.forEach((i, j) => {
    coloropt.push({
      label: i.title,
      value: i.title,
    });
  });

  return (
    <section>
      <h3 className="mb-4 title">Add New Product</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="mt-4">
          <CustomInput
            type="text"
            name="title"
            id="title"
            label="Product Title"
            placeholder="Product Title"
            val={formik.values.title}
            onCh={formik.handleChange("title")}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="my-2 error">{formik.errors.title}</div>
          ) : null}
        </div>
        <ReactQuill
          theme="snow"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange("description")}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="my-2 error">{formik.errors.description}</div>
        ) : null}
        <div className="mt-4">
          <CustomInput
            type="number"
            name="price"
            id="price"
            label="Price"
            placeholder="Price"
            val={formik.values.price}
            onCh={formik.handleChange("price")}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="my-2 error">{formik.errors.price}</div>
          ) : null}
        </div>
        <select
          name="category"
          id="category"
          className="form-control py-3 mb-3"
          value={formik.values.category}
          onChange={formik.handleChange("category")}
        >
          <option value="">Select category</option>
          {categoryState?.map((n) => (
            <option key={n._id} value={n.title}>
              {n.title}
            </option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category ? (
          <div className="my-2 error">{formik.errors.category}</div>
        ) : null}
        <select
          name="tags"
          id="tags"
          className="form-control py-3 mb-3"
          value={formik.values.tags}
          onChange={formik.handleChange("tags")}
        >
          <option value="" disabled>
            Select tags
          </option>
          <option value="featured">Featured</option>
          <option value="popular">Popular</option>
          <option value="special">Special</option>
        </select>
        {formik.touched.tags && formik.errors.tags ? (
          <div className="my-2 error">{formik.errors.tags}</div>
        ) : null}
        <div className="my-3">
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            defaultValue={color}
            onChange={(e) => setColor(e)}
            options={coloropt}
          />
        </div>

        {formik.touched.color && formik.errors.color ? (
          <div className="my-2 error">{formik.errors.color}</div>
        ) : null}
        <select
          name="brand"
          id="brand"
          className="form-control py-3 mb-3"
          value={formik.values.brand}
          onChange={formik.handleChange("brand")}
        >
          <option value="default">Select Brand</option>
          {brandState?.map((n) => (
            <option key={n._id} value={n.title}>
              {n.title}
            </option>
          ))}
        </select>
        {formik.touched.brand && formik.errors.brand ? (
          <div className="my-2 error">{formik.errors.brand}</div>
        ) : null}
        <div>
          <CustomInput
            type="number"
            name="quantity"
            id="quantity"
            label="Quantity"
            placeholder="Quantity"
            val={formik.values.quantity}
            onCh={formik.handleChange("quantity")}
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="my-2 error">{formik.errors.quantity}</div>
          ) : null}
        </div>
        <div className="bg-white border-1 text-center p-5">
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
          Add Product
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
