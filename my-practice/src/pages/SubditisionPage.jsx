import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Employee from "../components/Employee";
import "../components/styles/App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SubdivisionPage() { 
    const [emoloyee_data, set_employee_data] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`http://127.0.0.1:3001/employees/all`);

            set_employee_data(res.data);
        }
        getData();
    }, []);

    const employee_list = emoloyee_data.map(employee =>
        <Employee
            key={employee._id}
            name={employee.name}
            subdivision={employee.sub_name}
            mig_cart={employee.mig_cart}
            patent={employee.patent}
            time_mig_cart={employee.time_mig_cart}
            time_patent={employee.time_patent}
        />
    );

    return (
        <div>
            <Header/>
            <h1 className="title">Employees</h1>
            <div className="employees_grid">
                {employee_list}
            </div>
            <Footer/>
        </div>
        
    )
}