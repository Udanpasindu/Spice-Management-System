import PaymentRequestModel from '../models/PaymentRequestModel.js';
import PaidPaymentsModel from '../models/PaidPaymentModel.js';



//add payment requests
const addPaymentRequest = async (req, res, next) => {

    const{section,role,description,amount,status} = req.body;

    const PaymentRequests = new PaymentRequestModel({section, role, description, amount, status});

    try{
        await PaymentRequests.save();
        res.json({success:true,message:"Successfully added payment Report"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//display all requests
const getAllPaymentRequests = async (req, res, next) => {

    let  paymentRequests;
    try{
        paymentRequests = await PaymentRequestModel.find();
    }catch(err){
        console.log(err);
    }
    //paymentRequests not found
    if(!paymentRequests){
        return res.status(404).json({message:"PaymentRequests not found"});
    }
    //display all paymentRequests
    return res.status(200).json(paymentRequests);
};


//update paymentRequest
const updatePaymentRequest = async (req, res, next) => {
    const id = req.params.id;
    const { section, role, description, amount, status } = req.body;

    try {
        let paymentRequest = await PaymentRequestModel.findByIdAndUpdate(id, {
            section: section,
            role: role,
            description: description,
            amount: amount,
            status: status
        });

        if (!paymentRequest) {
            return res.status(404).json({ message: "Unable to update payment request" });
        }

        if (status === "Paid") {
            // Create a new document in paidPayments collection
            const paidPayment = new PaidPaymentsModel({
                section: section,
                role: role,
                description: description,
                amount: amount,
                status: status
            });

            await paidPayment.save();

            // Delete the updated payment request from paymentRequests collection
            await PaymentRequestModel.findByIdAndDelete(id);
        }

        return res.status(200).json({ message: "Payment request updated successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//delete paymentRequest
const deletePaymentRequest = async (req, res, next) => {
    const id = req.params.id;

    let paymentRequest;

    try{
        paymentRequest = await PaymentRequestModel.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    //unable to delete
    if(!paymentRequest){
        return res.status(404).json({message:"Unable to Delete payment request"});
    }
    return res.status(200).json({paymentRequest});
}


const getById = async (req, res, next) => {

    const id = req.params.id;

    let paymentRequest;

    try{
        paymentRequest = await PaymentRequestModel.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!paymentRequest){
        return res.status(404).json({message:"Report not found"});
    }
    return res.status(200).json({paymentRequest});

}


export {addPaymentRequest, getAllPaymentRequests, updatePaymentRequest, deletePaymentRequest, getById}