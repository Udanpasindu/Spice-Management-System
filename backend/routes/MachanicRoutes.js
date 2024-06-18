//const express=require("express");
import express from "express"

const router= express.Router();

//Insret machanic controller
//const MachanicController = require("../Controllers/MachanicControllers");
import MachanicController from "../Controllers/MachanicControllers.js"


router.get("/",MachanicController.getAllmachanics);
router.post("/",MachanicController.addMachanics);
router.get("/:id",MachanicController.getMachanicById);
router.put("/:id",MachanicController.updateMachanic);
router.delete("/:id",MachanicController.deleteMachanic);





//export
export default router;