import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { register } from "../api";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "../context/appContext";

export default function Register() {

  const navigate = useNavigate('')
  const { setUser } = useContext(AppContext)

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    } 

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Must be 6 characters or greater";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
        const res = await register(values)
        if(res) {
          if(res.status === 201){
            toast.success(`${res.data.message}`,{
              position: "bottom-center",
              style: {
                maxWidth: "fit-content"
              }
            });
            setUser(res.data.user)
            setTimeout(() => {
              navigate('/')
            },1000)
          }
        }
    },
  });

  return (
    <div className="form-demo h-screen grow flex justify-center items-center">
      <div class="w-full mt-16 max-w-md">
        <form
          onSubmit={formik.handleSubmit}
          class="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              class="appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username ? <div>{formik.errors.username}</div> : null}
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              class="appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email"
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              class="appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
          </div>
          <div class="flex flex-col gap-5 items-center justify-between">
            <button
              type="submit"
              class="bg-rose-500 w-full hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <Link to={"/login"} className="text-sm hover:text-gray-600">
              Already have a account! Click Here
            </Link>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
          &copy;{} Airbnb. All rights reserved.
        </p>
      </div>
    </div>
  );
}
