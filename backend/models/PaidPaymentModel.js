import mongoose from "mongoose";

const PaidPaymentsSchema = new mongoose.Schema({
    section: {
      type: String,
      required: true
    },
    role: {
        type: String,
        required: true
      },
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
        type: String,
        required: true
      }
  }, { timestamps: true });
  
  const PaidPayments = mongoose.model('PaidPayments', PaidPaymentsSchema);
  
 export default PaidPayments; 