//const Machine =require("../Model/MachineModel");
import Machine from "../models/MachineModel.js"


const getAllMachines = async(req,res,next)=>{
    let machins;
    //get all machanics
    try{
        machins=await Machine.find();

    }catch(err){
        console.log(err);
    }

    //not found 
    if(!machins){
        return res.status(404).json({message:"Machine Not found!!"})

    }

    //displpay all machanics

    return res.status(200).json({machins});
};

//insert data
const addMachins = async (req,res,next)=>{
        const{mType,mRapiredDate,efficiency}=req.body;
        let machins;
        try{
            machins=new Machine({mType,mRapiredDate,efficiency});
            await machins.save();
        }catch(err){
            console.log(err);
        }
        //if not insert
    if(!machins){
        return res.status(404).send({message:"unable to add machanics"})
    }
    return res.status(200).json({machins});
}

//Get by ID 

const getMachineById = async (req,res,next)=>{
    const id = req.params.id;

    let machin ;

    try{
        machin = await Machine.findById(id);
    }catch(err){
        console.log(err);
    }
     //not avilable machnaic
     if(!machin){
        return res.status(404).send({message:"unable to add machine"})
    }
    return res.status(200).json({machin});


};

//udate machine 

//update machanic

const updateMachine = async (req,res,next)=>{
    const id = req.params.id;
    const{mType,mRapiredDate,efficiency}= req.body;

    let machins;
    try{
        machins =await Machine.findByIdAndUpdate(
            id,{mType:mType,mRapiredDate:mRapiredDate,efficiency:efficiency});
            machins= await machins.save();
    }catch(err){
        console.log(err);
    }
    if(!machins){
        return res.status(404).send({message:"unable to update machin details"})
    }
    return res.status(200).json({machins});
};

//delete machine

const deleteMachine =async (req,res,next)=>{

    const id = req.params.id;
    let machin;
    try{

        machin= await Machine.findByIdAndDelete(id);

    }catch(err){
        console.log(err)
    }
    if(!machin){
        return res.status(404).send({message:"unable to delete machine details"})
    }
    return res.status(200).json({machin});
};

export default {getMachineById,getAllMachines, addMachins,updateMachine,deleteMachine}
