import enquiryModel from "../models/enquiryModel.js";

// Controller function to get all enquiries
const getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await enquiryModel.find();
        res.json(enquiries);
    } catch (error) {
        res.status(500).send("Error fetching enquiries: " + error.message);
    }
};

export { getAllEnquiries };
