import promotionModel from "../models/PromotionModel.js";
import fs from 'fs'

//add promotion
const addPromotion = async (req, res) => {
    let promoImage_filename = `${req.file.filename}`

    const promotion = new promotionModel({
        name: req.body.name,
        itemName: req.body.itemName,
        description: req.body.description,
        discount: req.body.discount,
        promoimage: promoImage_filename,
        validDate: req.body.validDate,
        quantity: req.body.quantity
    });
    try {
        await promotion.save();
        res.json({ success: true, message: "Promotion Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//all promotion list
const listPromotion = async (req, res, next) => {
    try {
        const promotions = await promotionModel.find({});
        res.json({ success: true, data: promotions })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//remove promotion
const removePromotion = async (req, res) => {
    try {
        const promotions = await promotionModel.findById(req.body.id);
        fs.unlink(`promoupload/${promotions.promoimage}`, () => { })

        await promotionModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Promotion Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Edit promotion
const editPromotion = async (req, res, next) => {
    const id = req.params.id;
    const { name, description, itemName, validDate, discount, quantity } = req.body;
    try {
        // Find the promotion by ID
        let promotion = await promotionModel.findById(id);

        if (!promotion) {
            return res.status(404).json({ message: "Promotion not found" });
        }

        // Update promotion data
        promotion = await promotionModel.findByIdAndUpdate(id, {
            name: name || promotion.name,
            validDate: validDate || promotion.validDate,
            description: description || promotion.description,
            itemName: itemName || promotion.itemName,
            discount: discount || promotion.discount,
            quantity: quantity || promotion.quantity
        }, { new: true }); // Return the updated document

        return res.status(200).json({ message: "Promotion updated successfully", promotion });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { addPromotion, listPromotion, removePromotion, editPromotion }