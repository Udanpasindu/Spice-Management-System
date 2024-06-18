import mongoose from 'mongoose';

const SalarySchema = new mongoose.Schema({
    empID: String,
    month: String,
    basicSalary: String,
    totalOTHours: Number,
    otRate: Number,
    bonus: Number,
    totalSalary: Number,
    accountNumber:Number,
    bank:String
})

const SalaryModel = mongoose.model("Salary", SalarySchema);

export default SalaryModel;
