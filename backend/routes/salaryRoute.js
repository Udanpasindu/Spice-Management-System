import express from 'express';
const router = express.Router();
import salaryController from '../controllers/salaryController.js'; 

const { getSalary, createSalary, salaryGetById, updateSalary, deleteSalaryById } = salaryController; 

router.get('/getSalary', getSalary);
router.post('/CreateSalary', createSalary);
router.get('/getSalary/:id', salaryGetById);
router.put('/updateSal/:id', updateSalary);
router.delete('/deleteSal/:id',deleteSalaryById);

export default router;
