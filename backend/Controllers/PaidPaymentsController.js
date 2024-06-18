import PaidPaymentsModel from '../models/PaidPaymentModel.js';

//display all paidPayments
const getAllPaidPayments = async (req, res, next) => {

    let  paidPayments;
    try{
        paidPayments = await PaidPaymentsModel.find();
    }catch(err){
        console.log(err);
    }
    //paidPayments not found
    if(!paidPayments){
        return res.status(404).json({message:"PaidPayments not found"});
    }
    //display all paidPayments
    return res.status(200).json(paidPayments);
};


const getTotalPaidAmount = async (req, res, next) => {
    try {
        const totalAmount = await PaidPaymentsModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" } // Calculate total amount for all payments
                }
            }
        ]);

        if (totalAmount.length === 0) {
            return res.status(404).json({ message: "No paid payments found" });
        }

        return res.status(200).json(totalAmount[0].total); // Return total amount of all paid payments
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};





const getTotalAmountForMonth = async (req, res, next) => {
    const { month } = req.params; // Extract month from request parameters

    try {
        const totalAmount = await PaidPaymentsModel.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$createdAt" }, parseInt(month)] // Filter by month
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" } // Calculate total amount for the selected month 
                }
            }
        ]);

        if (totalAmount.length === 0) {
            return res.status(404).json({ message: "No data found for the selected month" });
        }

        return res.status(200).json(totalAmount[0].total); // Return total amount
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { getAllPaidPayments, getTotalAmountForMonth, getTotalPaidAmount};