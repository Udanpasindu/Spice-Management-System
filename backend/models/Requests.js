import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  name: String,
  rid: String,
  quantity: String,
  price: String,
  deadLine: String,
});
const RequestModel = mongoose.model("Request", RequestSchema);
export default RequestModel;
