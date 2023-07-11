import React from "react";
import CustomInput from "../components/CustomInput";

const Login = () => {
  return (
    <section
      className="py-5"
      style={{ background: "#ffd333", minHeight: "100vh" }}
    >
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center text-muted">
          Login to your account to continue
        </p>
        <form action="">
          <CustomInput type="email" name="email" id="email" label="Email" />
          <CustomInput
            type="password"
            name="password"
            id="password"
            label="Password"
          />
          <button
            className="btn border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
