import React from "react";
import CustomInput from "../components/CustomInput";

const AddBrand = () => {
  return (
    <section>
      <h3 className="mb-4">Add Brand</h3>
      <form action="">
        <CustomInput
          type="text"
          name="brand"
          id="brand"
          label="Brand"
          placeholder="Brand"
        />

        <button className="btn border-0 my-5 btn-success">Add Brand</button>
      </form>
    </section>
  );
};

export default AddBrand;
