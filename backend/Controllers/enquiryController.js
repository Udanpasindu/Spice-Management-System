import enquiryModel from "../models/enquiryModel.js";




//add enquiry
const addEnquiry = async (req, res) => {

    const enquiry = new enquiryModel({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        product: req.body.product,
        description: req.body.description,
        date: new Date()
    })
    try {
        await enquiry.save();
        res.json({ success: true, message: "Enquiry added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })    
    }
}
const displayEnquiries = async (req, res) => {
    try {
        const enquiries = await enquiryModel.find({});
        res.json(enquiries);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const displayEnquiryById = async (req, res) => {
    try {
        const enquiry = await enquiryModel.findById(req.params.id);
        if (!enquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found" });
        }
        res.json(enquiry);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const deleteEnquiry =  async (req, res) => {
    const id =req.params.id;
    enquiryModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err=> res.json(err))
};

export { addEnquiry,displayEnquiries,displayEnquiryById,deleteEnquiry }