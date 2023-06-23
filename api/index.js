import express from "express";
import mongoose from "mongoose";
import http from 'http';
import {registerValidation, loginValidation, createEmployees} from './validation.js'
import checkAuth from "./utils/checkAuth.js";
import cors from 'cors';
import * as UserController from "./controllers/userContr.js";
import * as EmployeesController from "./controllers/employeesContr.js";
import * as SubdivController from "./controllers/subdivisionContr.js";
import * as CompanyController from "./controllers/company.js";

mongoose
.connect('mongodb://localhost:27017')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

const app = express(); 

app.use(cors());
app.use(express.json());

const server = http.createServer(app, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
    }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post('/auth/login', loginValidation, UserController.login );
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.AboutMe);

app.post('/create/employees', checkAuth, EmployeesController.createEmploy);
app.get('/employees/all', EmployeesController.getAllEmployee);
// app.post('/employees/:id', checkAuth, employeesController.getOneEmployee);
app.delete('/employees/:id', EmployeesController.removeEmploy);
app.post('/create/subdivision', checkAuth, SubdivController.createSubdivision);
app.post('/create/Company', checkAuth, CompanyController.createCompany);
app.get('/subdivision/all', SubdivController.getAllSubdivision);

server.listen(3001, () => {
    console.log("Listening on port 3001");
});

