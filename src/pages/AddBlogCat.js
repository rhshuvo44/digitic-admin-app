import React from "react";
import CustomInput from "../components/CustomInput";

const AddBlogCat = () => {
  return (
    <div>
      <h3 className="mb-4">Add Blog</h3>

      <form action="">
        <CustomInput
          type="text"
          name="blog-category"
          id="blog-category"
          label="Enter Blog Category"
          placeholder="Enter Blog Category"
        />

        <button className="btn border-0 my-5 btn-success">
          Add Blog Category
        </button>
      </form>
    </div>
  );
};

export default AddBlogCat;
