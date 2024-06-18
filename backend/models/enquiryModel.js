import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    product: { type: String, required: true },
    description: { type: String, required: true },
    date: {type: Date,  default: Date.now}
})
const enquiryModel = mongoose.models.enquiry || mongoose.model("enquiry",enquirySchema);

export default enquiryModel;