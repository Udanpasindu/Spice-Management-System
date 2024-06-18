import express from 'express';
import { addFood, listFood, removeFood,editFood,getFoodDetails } from '../Controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

//image storage engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)
foodRouter.put("/list/:id", upload.single("image"), editFood);
foodRouter.get("/list/:id", getFoodDetails);








export default foodRouter;