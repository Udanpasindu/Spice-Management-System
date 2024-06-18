//const mongoose=require("mongoose");
import mongoose from "mongoose"


const Schema = mongoose.Schema;



const machineSchema = new Schema({
   
    mType:{
        type :String,
        require:true,
   },
    mRapiredDate:{
        type :String,
        require:true,
},
    efficiency:{
        type :String,
        require:true,
        min: 0,
        max: 100
}
});

export default  mongoose.model(
    "MachineModel",
    machineSchema

)