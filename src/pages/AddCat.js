import React from "react";
import CustomInput from "../components/CustomInput";

const AddCat = () => {
  return (
    <section>
      <h3 className="mb-4 title">Add Product Category</h3>
      <form action="">
        <CustomInput
          type="text"
          name="category"
          id="category"
          label="Category"
          placeholder="Category"
        />

        <button className="btn border-0 my-5 btn-success">Add Category</button>
      </form>
    </section>
  );
};

export default AddCat;
