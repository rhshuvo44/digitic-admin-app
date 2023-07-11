import React from "react";
import CustomInput from "../components/CustomInput";

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <form action="">
          <div class="form-floating mb-3">
            <CustomInput
              type="email"
              name="email"
              id="email"
              placeholder="name@example.com"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div class="form-floating mb-3">
            <CustomInput
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            className="btn border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
