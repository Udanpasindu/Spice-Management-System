import express from 'express';

const supplierRouter = express.Router();
import { RatingController} from '../controllers/RatingController.js';
import { RequestController} from '../controllers/RequestController.js';
import { ARequestController} from '../controllers/ARequestController.js';

supplierRouter.get("/rating/getall", RatingController.getAll);
supplierRouter.put("/rating/update/:id", RatingController.update);
supplierRouter.delete("/rating/delete/:id", RatingController.deleteOne);
supplierRouter.post("/rating/create", RatingController.create);

supplierRouter.get("/request/getone/:id", RequestController.getOne);
supplierRouter.get("/request/getall", RequestController.getAll);
supplierRouter.put("/request/update/:id", RequestController.update);
supplierRouter.delete("/request/delete/:id", RequestController.deleteOne);
supplierRouter.post("/request/create", RequestController.create);

supplierRouter.get("/arequest/getone/:id", ARequestController.getOne);
supplierRouter.get("/arequest/getall", ARequestController.getAll);
supplierRouter.put("/arequest/update/:id", ARequestController.update);
supplierRouter.delete("/arequest/delete/:id", ARequestController.deleteOne);
supplierRouter.post("/arequest/create", ARequestController.create);

export default supplierRouter;
