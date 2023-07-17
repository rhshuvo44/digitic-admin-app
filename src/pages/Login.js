import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import authService from "../features/auth/authService";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login = () => {
  const { login } = authService;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authSate = useSelector((state) => state);
  const { user, isError, isLoading, isSuccess, message } = authSate.auth;
  useEffect(() => {
    if (user) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isError, isLoading, isSuccess, navigate]);
  return (
    <section
      className="py-5"
      style={{ background: "#ffd333", minHeight: "100vh" }}
    >
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center text-muted">
          Login to your account to continue
        </p>
        <div className="text-center text-danger">
          {message?.message === "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="email"
            name="email"
            id="email"
            label="Email"
            placeholder="Email"
            val={formik.values.email}
            onCh={formik.handleChange("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="my-2 error">{formik.errors.email}</div>
          ) : null}
          <CustomInput
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            label="Password"
            val={formik.values.password}
            onCh={formik.handleChange("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <div className="mb-3 text-end">
            <Link to="/forgot-password" className="text-danger">
              Forgot Password
            </Link>
          </div>
          <button
            type="submit"
            className="btn border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
