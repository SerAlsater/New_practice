import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Employees() { 
    const [emp, setEmp] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`http://127.0.0.1:3001/employees/all`);

            setEmp(res.data);
        }
        getData();
    }, []);

    const employee_list = emp.map(employee => <h1>{employee.name}</h1>);

    return (
        <div>
            {/* <h1>hi, {emp.join(', ')}</h1> */}
            {/* <button>hi</button> */}
            {employee_list}
        </div>
    )
}