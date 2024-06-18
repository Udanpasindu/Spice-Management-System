
import mongoose from 'mongoose'

const empUserSchema = new mongoose.Schema({
    name: String,
    password: String,
    confirmpassword:String,
    email: String,
    age: Number,
    jobroll: String,
    bank: String,
    accountNumber:Number

})

const empUserModel = mongoose.model("empusers", empUserSchema)
export default empUserModel