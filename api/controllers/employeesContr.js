import EmpoloyeesModel from "../models/employees.js"
import db from "../utils/idb.js"
import { ObjectId } from "mongodb";

export async function createEmploy(req, res) {
    const empl = {
        name: req.body.name,
        subdivision_id: req.body.subdivision_id,
        mig_cart: req.body.mig_cart,
        patent: req.body.patent,
        time_mig_cart: req.body.time_mig_cart,
        time_patent: req.body.time_patent,
        user: req.userId
    }
    
    const result = await db.save(empl, "employees");

    if (!result.Ok) {
        return res.status(500).send("error: DB failed from createEmploy");
    }

    res.status(200).send(result.Ok);
}

async function add_subdivision_name(all_employees) { 
    const client_data = Promise.all(all_employees.map(async (emp) => {
        const id = new ObjectId(emp.subdivision_id);
        const subdivision_name = await db.find({_id: id}, "subdivision");

        const employee_data = {
            ...emp,
            sub_name: subdivision_name.Ok.sub_name,
        }

        return employee_data;
    }));

    return client_data;
}

export const getAllEmployee = async (req, res) => {
    try {
        const all = await db.find_all({}, "employees");
        const client_data = await add_subdivision_name(all.Ok);
        
        res.status(200).send(client_data);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось найти сотрудников'
        })
    }
}

export async function getEmployeesBySubdivision(req, res) {
    const subdivision_id = req.params.subdivision_id;
    const employees = await db.find({ subdivision_id }, "employees");

    res.status(200).send(employees);
}

export async function removeEmploy(req, res) {
    const EmployId = req.params.id;

    const result = await db.delete(EmployId, "employees");

    if (!result.Ok) return res.status(500).send("error: DB failed from createEmploy");

    res.status(200).send("successfully removed employee");
}

