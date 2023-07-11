import React from "react";

const CustomInput = ({ name, type, classname, id, label, placeholder }) => {
  return (
    <div class="form-floating mb-3">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classname}`}
        id={id}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CustomInput;
