import SubdivisionModel from "../models/subdivision.js";
import db from "../utils/idb.js"

export async function createSubdivision(req, res) {
    try {
        const new_sub = {
            sub_name: req.body.subdivision_name,
            company_id: req.body.company_id,
            employees_id: [],
            user: req.userId
        }

        const result = db.save(new_sub, "subdivision")    

        if (!result.Ok) {
            console.log(result);
            return res.status(500).send("error: DB failed from createEmploy");
        }

        res.status(200).send(result.Ok);

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать подразделение'
        })
    }
}

export const getAllSubdivision = async (req, res) => {
    try {
        const result = await db.find_all({}, "subdivision");
    
        res.status(200).send(result.Ok);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось найти подразделения'
        })
    }
}