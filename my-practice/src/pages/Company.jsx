import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../components/styles/Card.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Company() { 
    const [emp, setEmp] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`http://127.0.0.1:3001/subdivision/all`);

            setEmp(res.data);
        }
        getData();
    }, []);

    const Subdiv_list = emp.map(subdivision => <h1 className="card">{subdivision.sub_name}</h1>);

    return (
        <div>
            <Header/>
            <h1 className="title">Subdivision</h1>
            {Subdiv_list}
            <Footer/>
        </div>
    )
}