//const express=require("express");
import express from "express"

const router= express.Router();

//insert MachineController
//const UtilityController = require("../Controllers/UtilityController");
import UtilityController from "../Controllers/UtilityController.js"







router.get("/",UtilityController.getAllUtility);
router.post("/",UtilityController.addUtility);
router.get("/:id",UtilityController.getUtilityById);
router.put("/:id",UtilityController.updateUtility);
router.delete("/:id",UtilityController.deleteUtility);













export default router;