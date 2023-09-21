import React, { useEffect, useState, useRef  } from "react";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import "../scss/login.scss";

export default function Login() {

    const [formData, setFormData] = useState({email: "",password: ""});
    const toast = useRef(null);
    const validate = values => {
        const errors = {};
        if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length < 6) {
          errors.password = 'Must be 6 characters or greater';
        }
      
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
      
        return errors;
      };

      const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2))
        },
      });
  

  return (
    <div className="form-demo h-screen grow flex justify-center items-center">
        <div class="w-full max-w-md">
  <form onSubmit={formik.handleSubmit} class="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Email
      </label>
      <input 
               id="email"
               name="email"
               type="email"
               onChange={formik.handleChange}
               value={formik.values.email}
      class="appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" />
    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input 
                     id="password"
                     name="password"
                     type="password"
                     onChange={formik.handleChange}
                     value={formik.values.password}
      class={`appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} placeholder="Password" />
    {formik.errors.password ? <div>{formik.errors.password}</div> : null}
    </div>
    <div class="flex flex-col gap-5 items-center justify-between">
      <button class="bg-rose-500 w-full hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" type="submit">
        Sign In
      </button>
      <Link to={'/register'} className="text-sm hover:text-gray-600">Don't have account yet? Register Now</Link>
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;{} Airbnb. All rights reserved.
  </p>
</div>
    </div>
  );
}
