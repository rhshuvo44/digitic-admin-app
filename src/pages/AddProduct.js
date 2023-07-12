import React from "react";
import CustomInput from "../components/CustomInput";

const AddProduct = () => {
  return (
    <section>
      <h3 className="mb-4">Add New Product</h3>
      <form action="">
        <CustomInput
          type="text"
          name="product"
          id="product"
          label="Add Product"
          placeholder="Add Product"
        />

        <button className="btn border-0 my-5 btn-success">Add Product</button>
      </form>
    </section>
  );
};

export default AddProduct;
