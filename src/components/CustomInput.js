import React from "react";

const CustomInput = ({ name, type, classname, placeholder, id }) => {
  return (
    <input
      type={type}
      name={name}
      class={`form-control ${classname}`}
      id={id}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
