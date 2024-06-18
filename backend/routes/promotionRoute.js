import express from 'express';
import { addPromotion,listPromotion,removePromotion,editPromotion } from '../Controllers/promotionController.js';
import multer from 'multer';

const promotionRouter = express.Router();

//image Storage
const storage = multer.diskStorage({
    destination:"promoupload",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const promoupload = multer({storage: storage})

promotionRouter.post("/addpromotion",promoupload.single("promoimage"),addPromotion)
promotionRouter.get("/listpromotion",listPromotion)
promotionRouter.post("/remove",removePromotion)
promotionRouter.put("/list/:id", editPromotion)


export default promotionRouter;