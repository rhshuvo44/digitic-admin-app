import React from "react";
import CustomInput from "../components/CustomInput";

const AddColor = () => {
  return (
    <section>
      <h3 className="mb-4 title">Add Color</h3>
      <form action="">
        <CustomInput
          type="text"
          name="color"
          id="color"
          label="Color"
          placeholder="Color"
        />

        <button className="btn border-0 my-5 btn-success">Add Color</button>
      </form>
    </section>
  );
};

export default AddColor;
