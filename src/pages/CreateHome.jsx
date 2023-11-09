import React, { useState } from "react";
import { useFormik } from "formik";
import { InputText, } from "primereact/inputtext";

import { InputNumber } from 'primereact/inputnumber';

function CreateHome() {
  const [value, setValue] = useState("");

  return (
    <div className="pages bg-slate-100 h-screen flex justify-content-center">
      <div className="" style={{width: '40vw'}}>
        <form action="">
          <div className="card px-6 py-8 bg-white shadow-md rounded-2xl md:grid grid-cols-3 gap-4">
            <div className="p-grid">
            <div className="p-col-12">
              <span className="p-float-label">
                <InputText
                  id="name"
                  name="name"
                //   value={formik.values.name}
                //   onChange={formik.handleChange}
                  autoFocus
                />
                <label htmlFor="name" className="text-sm">Name</label>
              </span>
            </div>
            <div className="field">
              <span className="p-float-label">
                <InputNumber maxFractionDigits={5} />
                <label htmlFor="name" className="text-sm">Child capacity</label>
              </span>
            </div>
            </div>
            <div className="perks__container"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateHome;
