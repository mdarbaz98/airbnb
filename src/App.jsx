import React from "react";
import { Routes, Route, RouterProvider } from "react-router-dom";
import "./scss/index.scss";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import axios from "axios";
import { AppContextProvider } from "./context/appContext";
import Room from "./pages/Room";
import router from "./routes";

function App() {
  axios.defaults.baseURL = "http://localhost:5000/api";
  axios.defaults.withCredentials = false;

  return (
    <div className="App">
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </div>
  );
}

export default App;

