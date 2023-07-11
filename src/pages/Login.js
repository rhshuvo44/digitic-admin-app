import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";

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
          <CustomInput
            type="email"
            name="email"
            id="email"
            label="Email"
            placeholder="Email"
          />
          <CustomInput
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            label="Password"
          />
          <div className="mb-3 text-end">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <Link
            to="/admin"
            className="btn border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
          >
            Login
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
