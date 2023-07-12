import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomInput from "../components/CustomInput";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const AddProduct = () => {
  const [desc, setDesc] = useState();
  return (
    <section>
      <h3 className="mb-4 title">Add New Product</h3>
      <form action="">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
        <div className="mt-4">
          <CustomInput
            type="text"
            name="title"
            id="title"
            label="Product Title"
            placeholder="Product Title"
          />
        </div>
        <ReactQuill theme="snow" value={desc} onChange={setDesc} />
        <div className="mt-4">
          <CustomInput
            type="number"
            name="price"
            id="price"
            label="Price"
            placeholder="Price"
          />
        </div>
        <select name="" id="" className="form-control py-3 mb-3">
          <option value="">Select category</option>
          <option value="">Select category</option>
          <option value="">Select category</option>
        </select>

        <select name="" id="" className="form-control py-3 mb-3">
          <option value="">Select Color</option>
          <option value="">Select Color</option>
          <option value="">Select Color</option>
        </select>

        <select name="" id="" className="form-control py-3 mb-3">
          <option value="">Select Brand</option>
          <option value="">Select Brand</option>
          <option value="">Select Brand</option>
        </select>
        <div>
          <CustomInput
            type="number"
            name="quentity"
            id="quentity"
            label="Quentity"
            placeholder="Quentity"
          />
        </div>
        <button className="btn border-0 my-5 btn-success">Add Product</button>
      </form>
    </section>
  );
};

export default AddProduct;
