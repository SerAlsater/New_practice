import mongoose from "mongoose";

const EmployeesSchema = new mongoose.Schema({
    name: String, 
    subdivision: String,
    mig_cart: String,
    patent: String,
    time_mig_cart: String,
    time_patent: String,
    userId: String,
});

export default mongoose.model("Employees", EmployeesSchema);