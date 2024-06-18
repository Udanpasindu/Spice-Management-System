import express from "express"
import { addEnquiry, deleteEnquiry, displayEnquiries,displayEnquiryById } from "../Controllers/enquiryController.js"


const enquiryRouter = express.Router();

enquiryRouter.post("/add",addEnquiry)
enquiryRouter.get("/en", displayEnquiries);
enquiryRouter.get("/:id", displayEnquiryById);
enquiryRouter.delete("/deleteuser/:id", deleteEnquiry)


export default enquiryRouter;