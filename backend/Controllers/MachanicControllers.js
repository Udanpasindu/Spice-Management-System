//const Machanic =require("../Model/MachanicModel");
import Machanic from "../models/MachanicModel.js"

const getAllmachanics = async(req,res,next)=>{
    let machanics;
    //get all machanics
    try{
        machanics=await Machanic.find();

    }catch(err){
        console.log(err);
    }

    //not found 
    if(!machanics){
        return res.status(404).json({message:"Machanics Not found!!"})

    }

    //displpay all machanics

    return res.status(200).json({machanics});
};
//insert data
const addMachanics =async(req,res,next)=>{
    const{name,age,phone,address}= req.body;

    let machanics;
    try{

    machanics = new Machanic({name,age,phone,address});
    //save data base
    await machanics.save();
    }catch(err){
        console.log(err);
    }

    //not insert
    if(!machanics){
        return res.status(404).send({message:"unable to add machanics"})
    }
    return res.status(200).json({machanics});

};


//Get by ID 

const getMachanicById = async (req,res,next)=>{
    const id = req.params.id;

    let machanic ;

    try{
            machanic = await Machanic.findById(id);
    }catch(err){
        console.log(err);
    }
     //not avilable machnaic
     if(!machanic){
        return res.status(404).send({message:"unable to add machanics"})
    }
    return res.status(200).json({machanic});


};

//update machanic

const updateMachanic = async (req,res,next)=>{
    const id = req.params.id;
    const{name,age,phone,address}= req.body;

    let machanics;
    try{
        machanics =await Machanic.findByIdAndUpdate(id,
            {name:name,age:age,phone:phone,address:address});
            machanics= await machanics.save();
    }catch(err){
        console.log(err);
    }
    if(!machanics){
        return res.status(404).send({message:"unable to update machanic details"})
    }
    return res.status(200).json({machanics});
};


//delete machanic

const deleteMachanic =async (req,res,next)=>{

    const id = req.params.id;
    let machanic;
    try{

        machanic= await Machanic.findByIdAndDelete(id);

    }catch(err){
        console.log(err)
    }
    if(!machanic){
        return res.status(404).send({message:"unable to delete machanic details"})
    }
    return res.status(200).json({machanic});
};





export default {
    getAllmachanics,
    addMachanics,
    getMachanicById,
    updateMachanic,
    deleteMachanic
  };