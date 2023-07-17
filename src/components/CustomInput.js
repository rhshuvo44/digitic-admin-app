import React from "react";

const CustomInput = ({
  name,
  type,
  classname,
  id,
  label,
  placeholder,
  val,
  onCh,
}) => {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classname}`}
        id={id}
        value={val}
        onChange={onCh}
        onBlur={onCh}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CustomInput;
