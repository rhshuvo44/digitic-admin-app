import { useFormik } from "formik";
import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import Multiselect from "react-widgets/Multiselect";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import { getBrands } from "../features/brand/brandSlice";
import { getCategorys } from "../features/category/categorySlice";
import { getColors } from "../features/color/colorSlice";
import Dropzone from "react-dropzone";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  brand: yup.string().required("Brand is Required"),
  color: yup.array().required("Color is Required"),
  category: yup.string().required("Category is Required"),
  price: yup.number().required("Price is Required"),
  quentity: yup.number().required("Quentity is Required"),
});
const AddProduct = () => {
  // const [color, setColor] = useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      quentity: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategorys());
    dispatch(getColors());
  }, [dispatch]);
  const brandState = useSelector((state) => state?.brand?.brands?.getallBrand);
  const colorState = useSelector((state) => state?.color?.colors?.getallColor);
  const categoryState = useSelector(
    (state) => state?.category?.categorys?.getallCategory
  );
  const colors = [];
  colorState?.forEach((i, j) => {
    colors.push({
      id: j,
      color: i.title,
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
        <div className="my-3">
          <Multiselect
            dataKey="id"
            textField="color"
            defaultValue={[1]}
            name="color"
            data={colors}
            onChange={formik.handleChange("color")}
            // value={formik.values.color}
          />
        </div>

        {/* <select name="color" id="color" className="form-control py-3 mb-3">
          <option value="">Select Color</option>
        </select> */}
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
            name="quentity"
            id="quentity"
            label="Quentity"
            placeholder="Quentity"
            val={formik.values.quentity}
            onCh={formik.handleChange("quentity")}
          />
          {formik.touched.quentity && formik.errors.quentity ? (
            <div className="my-2 error">{formik.errors.quentity}</div>
          ) : null}
        </div>
        <div className="bg-white border-1 text-center p-5">
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p style={{ cursor: "pointer" }}>
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <button type="submit" className="btn border-0 my-5 btn-success">
          Add Product
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
