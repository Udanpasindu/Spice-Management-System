import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
  item: String,
  feedback: String,
  rating: String,
});
const RatingModel = mongoose.model("Rating", RatingSchema);
export default RatingModel;
