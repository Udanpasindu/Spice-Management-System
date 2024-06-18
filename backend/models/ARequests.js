import mongoose from "mongoose";
const ARequestSchema = new mongoose.Schema({
  name: String,
  arid: String,
  quantity: String,
  price: String,
  deadLine: String,
});
const ARequestModel = mongoose.model("ARequest", ARequestSchema);
export default ARequestModel;
