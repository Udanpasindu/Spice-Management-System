//const mongoose=require("mongoose");
import mongoose from "mongoose"

const Schema = mongoose.Schema;


const utilitySchema=new Schema({

    uDate:{
        type:String,
        require:true,
    },

    uWater:{
        type:String,
       // require:true,
    },

    uElectricity:{
        type:String,
       // require:true,
    },

    uMachanic_01_Name:{
        type:String,
        //require:true,
    },
    uMachanic_01_Amount:{
        type:String,
       // require:true,
    },

    uMachanic_01_bankD:{
        type:String,
       // require:true,
    },

    uMachanic_01_accNo:{
        type:String,
       // require:true,
    },

    uMachanic_02_Name:{
        type:String,
        //require:true,
    },
    uMachanic_02_Amount:{
        type:String,
        //require:true,
    },

    uMachanic_02_bankD:{
        type:String,
       // require:true,
    },

    uMachanic_02_accNo:{
        type:String,
        //require:true,
    },

    uMachanic_03_Name:{
        type:String,
        //require:true,
    },

    uMachanic_03_Amount:{
        type:String,
        //require:true,
    },

    uMachanic_03_bankD:{
        type:String,
       // require:true,
    },

    uMachanic_03_accNo:{
        type:String,
       // require:true,
    }


});


export default  mongoose.model(
    "UtilityModel",
    utilitySchema

)