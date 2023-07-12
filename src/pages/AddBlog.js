import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Stepper } from "react-form-stepper";

const AddBlog = () => {
  const [desc, setDesc] = useState();
  //   const handleDesc = (e) => {
  //     setDesc(e);
  //   };
  return (
    <div>
      <h3 className="mb-4">Add Blog</h3>
      <Stepper
        steps={[
          { label: "Add Blog Details" },
          { label: "Upload Images" },
          { label: "Finish" },
        ]}
        activeStep={1}
      />
      <div>
        <form action="">
          <CustomInput
            type="text"
            name="blog-title"
            id="blog-title"
            label="Enter Blog Title"
            placeholder="Enter Blog Title"
          />
          <select name="" id="" className="form-control py-3 mb-3">
            <option value="">Select Blog category</option>
            <option value="">Select Blog category</option>
            <option value="">Select Blog category</option>
          </select>
          <ReactQuill theme="snow" value={desc} onChange={setDesc} />
          <div>
            <button className="btn border-0 my-5 btn-success">Add Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
