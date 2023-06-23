import mongoose from "mongoose";

const SubdivisionSchema = new mongoose.Schema({
    sub_name: String,
    company_id: String,
    user: String,
    employees_id: []
})

export default mongoose.model('Subdivision', SubdivisionSchema)