import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    name: {type: "string",required: true},
    itemName: {type: "string",required: true},
    description: {type: "string",required: true},
    discount: {type: "number",required: true},
    promoimage: {type: "string",required: true},
    validDate: {type: "string",required: true},
    quantity: {type: "number",required: true}
})

const promotionModel = mongoose.models.promotion || mongoose.model("promotion",promotionSchema);

export default promotionModel;