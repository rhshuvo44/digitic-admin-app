import React from "react";

const CustomInput = ({ name, type, classname, id, label }) => {
  return (
    <div class="form-floating mb-3">
      <input
        type={type}
        name={name}
        class={`form-control ${classname}`}
        id={id}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CustomInput;
