//const mongoose=require("mongoose");
import mongoose from "mongoose"

const Schema = mongoose.Schema;

const machanicSchema= new Schema({
    name:{
         type :String,
         require:true,
    },
    age:{
        type :Number,
        require:true,
   },
    phone:{
        type :Number,
        require:true,
        length:10
        
       

},
    address:{
        type :String,
        require:true,
}
});

export default mongoose.model(
    "MachanicModel",
    machanicSchema

)