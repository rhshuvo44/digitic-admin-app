import React from "react";
import CustomInput from "../components/CustomInput";

const Forgotpassword = () => {
  return (
    <section
      className="py-5"
      style={{ background: "#ffd333", minHeight: "100vh" }}
    >
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Forgot Password</h3>
        <p className="text-center text-muted">
          Please Enter your register email to get reset password mail
        </p>
        <form action="">
          <CustomInput
            type="email"
            name="email"
            id="email"
            label="Email"
            placeholder="Email"
          />
          <button
            className="btn border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </section>
  );
};

export default Forgotpassword;
