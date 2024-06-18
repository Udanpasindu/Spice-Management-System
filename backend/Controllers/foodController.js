import foodmodel from '../models/foodModel.js';
import fs from 'fs';

//add food item
const addFood = async (req, res, next) => {

    let image_filename = `${req.file.filename}`

    const food = new foodmodel({
        name: req.body.name,
        description: req.body.description,
        quantity:req.body.quantity,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    try{
        await food.save();
        res.json({success:true,message:"Food added"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//all food list
const listFood = async (req, res, next) => {
    try{
        const foods = await foodmodel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
}
}

//remove food item
const removeFood = async (req,res)=>{
    try{
        const food = await foodmodel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
}
}

// Edit food item
const editFood = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name,quantity, description, price, category } = req.body;

        let updateData = {
            name,
            quantity,
            description,
            price,
            category,
        };

        if (req.file) {
            let image_filename = `${req.file.filename}`;
            updateData.image = image_filename;
        }

        const updatedFood = await foodmodel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedFood) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        res.json({ success: true, data: updatedFood });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating food" });
    }
}

// Get details of a single food item
const getFoodDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const food = await foodmodel.findById(id);
        
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        res.json({ success: true, data: food });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching food details" });
    }
}



export {addFood,listFood,removeFood,editFood,getFoodDetails}
