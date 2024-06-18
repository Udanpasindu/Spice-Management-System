//PromoController.js

import PromoModel from "../models/PromoModel.js";

const addPromo = async (req, res) => {
    if (!req.body.promocode || !req.body.promodiscount) {
        return res.status(400).json({ success: false, message: "Both promocode and promodiscount are required." });
    }

    const { promocode, promodiscount } = req.body;

    const promo = new PromoModel({
        promocode: promocode,
        promodiscount: promodiscount
    });

    try {
        await promo.save();
        res.json({ success: true, message: "Promo Added" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

const getPromoCodes = async (req, res) => {
    try {
        const promos = await PromoModel.find({}, 'promocode promodiscount');
        res.json(promos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const deletePromo = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPromo = await PromoModel.findByIdAndDelete(id);
        if (!deletedPromo) {
            return res.status(404).json({ success: false, message: "Promo code not found." });
        }
        res.json({ success: true, message: "Promo code deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export { addPromo, getPromoCodes, deletePromo};
