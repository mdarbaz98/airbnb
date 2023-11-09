import React from "react";
import { RouterProvider } from "react-router-dom";
import "./scss/index.scss";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

import axios from "axios";
import { AppContextProvider } from "./context/appContext";
import router from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  axios.defaults.baseURL = "http://localhost:5000/api";
  axios.defaults.withCredentials = false;

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </div>
  );
}

export default App;
