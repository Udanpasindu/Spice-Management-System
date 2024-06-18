//PromoRoutes.js

import express from "express";
import { addPromo , getPromoCodes } from "../Controllers/PromoController.js";
import { deletePromo } from "../Controllers/PromoController.js";

const promoRouter = express.Router();

promoRouter.post("/addpromo", addPromo);
promoRouter.get("/promocodes",getPromoCodes);
promoRouter.delete("/deletepromo/:id", deletePromo);


export default promoRouter;
