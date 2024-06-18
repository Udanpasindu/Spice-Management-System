import express from 'express';
import { addPaymentRequest, getAllPaymentRequests, updatePaymentRequest, deletePaymentRequest, getById } from '../controllers/PaymentRequestController.js';

const PaymentRequestRouter = express.Router();

PaymentRequestRouter.post("/add",addPaymentRequest)
PaymentRequestRouter.get("/list",getAllPaymentRequests)
PaymentRequestRouter.put("/list/:id",updatePaymentRequest)
PaymentRequestRouter.delete("/list/:id",deletePaymentRequest);
PaymentRequestRouter.get("/list/:id",getById);

export default PaymentRequestRouter;