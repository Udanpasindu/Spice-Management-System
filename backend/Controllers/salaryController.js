import SalaryModel from "../models/SalaryU.js";

const getSalary = (req, res) => {
    SalaryModel.find()
      .then(salary => res.json(salary))
      .catch(err => res.status(500).json({ error: err.message }));
  };
  
const createSalary = (req, res) => {
    SalaryModel.create(req.body)
      .then(salary => res.json(salary))
      .catch(err => res.status(500).json({ error: err.message }));
  };
  
const salaryGetById = (req, res) => {
    const id = req.params.id;
    SalaryModel.findById(id)
      .then(salary => res.json(salary))
      .catch(err => res.status(500).json({ error: err.message }));
  };
  
const updateSalary = (req, res) => {
    const id = req.params.id;
    SalaryModel.findByIdAndUpdate(id, req.body, { new: true })
      .then(salary => res.json(salary))
      .catch(err => res.status(500).json({ error: err.message }));
  };
const deleteSalaryById = (req, res) => {
    const salId = req.params.id;
    SalaryModel.findByIdAndDelete(salId)
      .then(() => {
        res.json({ success: true, message: 'Salary deleted successfully' });
      })
      .catch(err => {
        res.status(500).json({ success: false, message: err.message });
      });
  };

  export default {
    getSalary,
    createSalary,
    salaryGetById,
    updateSalary,
    deleteSalaryById
  };