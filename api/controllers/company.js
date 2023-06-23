import db from "../utils/idb.js"


export async function createCompany (req, res) {
    
    try {
        const company = {
            name: req.body.company_name,
            user: req.userId
        }
    
        const result = db.save(company, "Company")  
    
        if (!result.Ok) {
            console.log(result);
            return res.status(500).send("error: DB failed from createEmploy");
        }
    
        res.status(200).send(result.Ok);
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать компанию'
        })
    }
    
}