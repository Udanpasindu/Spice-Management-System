import express from 'express';
import { getAllPaidPayments, getTotalAmountForMonth, getTotalPaidAmount} from '../controllers/PaidPaymentsController.js';

const PaidPaymentRouter = express.Router();

PaidPaymentRouter.get("/list",getAllPaidPayments)
PaidPaymentRouter.get("/totalAmount/:month",getTotalAmountForMonth)
PaidPaymentRouter.get("/totalAmount",getTotalPaidAmount)

export default PaidPaymentRouter;