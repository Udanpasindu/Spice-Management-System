//PromoModel.js

import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
    promocode: { type: String, required: true },
    promodiscount: { type: Number, required: true }
});

const PromoModel = mongoose.model.promo || mongoose.model("promo", promoSchema);

export default PromoModel;
