//const Utility =require("../Model/UtilityModel");
import Utility from "../models/UtilityModel.js"



const getAllUtility = async(req,res,next)=>{
    let utilitis;
    //get all machanics
    try{
        utilitis=await Utility.find();

    }catch(err){
        console.log(err);
    }

    //not found 
    if(!utilitis){
        return res.status(404).json({message:"utilitis Not found!!"})

    }

    //displpay all machanics

    return res.status(200).json({utilitis});
};

//insert data
const addUtility = async (req,res,next)=>{
    const{uDate,uWater,uElectricity,
        uMachanic_01_Name,uMachanic_01_Amount,uMachanic_01_bankD,uMachanic_01_accNo,
        uMachanic_02_Name,uMachanic_02_Amount,uMachanic_02_bankD,uMachanic_02_accNo,
        uMachanic_03_Name,uMachanic_03_Amount,uMachanic_03_bankD,uMachanic_03_accNo
    }=req.body;
    let utilitis;
    try{
        utilitis=new Utility({uDate,uWater,uElectricity,
            uMachanic_01_Name,uMachanic_01_Amount,uMachanic_01_bankD,uMachanic_01_accNo,
            uMachanic_02_Name,uMachanic_02_Amount,uMachanic_02_bankD,uMachanic_02_accNo,
            uMachanic_03_Name,uMachanic_03_Amount,uMachanic_03_bankD,uMachanic_03_accNo});
        await utilitis.save();
    }catch(err){
        console.log(err);
    }
    //if not insert
if(!utilitis){
    return res.status(404).send({message:"unable to add utilitis"})
}
return res.status(200).json({utilitis});
};


//Get by ID 

const getUtilityById = async (req,res,next)=>{
    const id = req.params.id;

    let utility ;

    try{
        utility = await Utility.findById(id);
    }catch(err){
        console.log(err);
    }
     //not avilable utility
     if(!utility){
        return res.status(404).send({message:"unable to add utility"})
    }
    return res.status(200).json({utility});


};

//update utility

const updateUtility = async (req,res,next)=>{
    const id = req.params.id;
    const{uDate,uWater,uElectricity,
        uMachanic_01_Name,uMachanic_01_Amount,uMachanic_01_bankD,uMachanic_01_accNo,
        uMachanic_02_Name,uMachanic_02_Amount,uMachanic_02_bankD,uMachanic_02_accNo,
        uMachanic_03_Name,uMachanic_03_Amount,uMachanic_03_bankD,uMachanic_03_accNo
    }=req.body;

    let utilitis;
    try{
        utilitis =await Utility.findByIdAndUpdate(
            id,{uDate:uDate,uWater:uWater,uElectricity:uElectricity,
                uMachanic_01_Name:uMachanic_01_Name,uMachanic_01_Amount:uMachanic_01_Amount,uMachanic_01_bankD:uMachanic_01_bankD,uMachanic_01_accNo:uMachanic_01_accNo,
                uMachanic_02_Name:uMachanic_02_Name,uMachanic_02_Amount:uMachanic_02_Amount,uMachanic_02_bankD:uMachanic_02_bankD,uMachanic_02_accNo:uMachanic_02_accNo,
                uMachanic_03_Name:uMachanic_03_Name,uMachanic_03_Amount:uMachanic_03_Amount,uMachanic_03_bankD:uMachanic_03_bankD,uMachanic_03_accNo:uMachanic_03_accNo});
                utilitis= await utilitis.save();
    }catch(err){
        console.log(err);
    }
    if(!utilitis){
        return res.status(404).send({message:"unable to update utilitis details"})
    }
    return res.status(200).json({utilitis});
};

//delete utilitis

const deleteUtility =async (req,res,next)=>{

    const id = req.params.id;
    let utility;
    try{

        utility= await Utility.findByIdAndDelete(id);

    }catch(err){
        console.log(err)
    }
    if(!utility){
        return res.status(404).send({message:"unable to delete utility details"})
    }
    return res.status(200).json({utility});
};


export default {getAllUtility,addUtility, getUtilityById,updateUtility,deleteUtility}
