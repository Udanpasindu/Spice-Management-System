//const express=require("express");
import express from "express"

const router= express.Router();


//insert MachineController//
//const MachineController = require("../Controllers/MachineController");
import MachineController from "../Controllers/MachineController.js"



router.get("/",MachineController.getAllMachines);
router.post("/",MachineController.addMachins);
router.get("/:id",MachineController.getMachineById);
router.put("/:id",MachineController.updateMachine);
router.delete("/:id",MachineController.deleteMachine);






//export
export default router;