import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';

export default function Register() {

    const formik = useFormik({
        initialValues: {
          email: '',
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

  return (
<div className="form-demo h-screen grow flex justify-center items-center">
        <div class="w-full max-w-md">
  <form onSubmit={formik.handleSubmit} class="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label
               id="email"
               name="email"
               type="email"
               onChange={formik.handleChange}
               value={formik.values.email}
       class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Username
      </label>
      <input class="appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Confirm Password
      </label>
      <input class="appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
    </div>
    <div class="flex flex-col gap-5 items-center justify-between">
      <button type="submit" class="bg-rose-500 w-full hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
        Sign In
      </button>
      <Link to={'/login'} className="text-sm hover:text-gray-600">Already have a account! Click Here</Link>
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;{} Airbnb. All rights reserved.
  </p>
</div>
    </div>
  )
}
