import React from "react";
import { Routes ,Route } from 'react-router-dom';
import './scss/index.scss';
import Home from "./pages/Home";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
