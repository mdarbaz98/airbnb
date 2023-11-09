import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "../scss/login.scss";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { AppContext } from "../context/appContext";

export default function Login() {
  // const toast = useRef(null);
  const [ loading, setLoading ] = useState(false)
  const { setUser } = useContext(AppContext)
  const navigate = useNavigate('')
  const validate = (values) => {
    const errors = {};
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
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const {data, status} = await axios.post("/auth/login",values);
        if( status && status == 200 ){
          toast.success(`Login Successfully`,{
            position: "bottom-center",
            style: {
              maxWidth: "fit-content"
            }
          });
          setUser(data)
          localStorage.setItem("user",JSON.stringify(data))
          setLoading(false)
          setTimeout(() => {
            navigate('/')
          },1000)
        }
      } catch (error) {
       const err = error?.response?.data?.message || "something went wrong :("
        toast.error(`${err}`,{
          position: "bottom-center",
          style: {
            maxWidth: "fit-content"
          }
        })
        setLoading(false)
      }
    },
  });

  return (
    <div className="form-demo h-screen grow flex justify-center items-center">
      <Toaster/>
      <div className="w-full mt-16 max-w-md">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className={`appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Password"
            />
            {formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex flex-col gap-5 items-center justify-between">
            <button
              className={`bg-rose-500 w-full hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              type="submit"
              disabled={loading}
            >
              Sign In
            </button>
            <Link to={"/register"} className="text-sm hover:text-gray-600">
              Don't have account yet? Register Now
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;{} Airbnb. All rights reserved.
        </p>
      </div>
    </div>
  );
}
