import express from 'express';
const router = express.Router();
import empController from '../Controllers/empController.js'; // Updated import

router.get('/users', empController.users);
router.post('/createUser', empController.createUser);
router.get('/getEmpuser/:id', empController.getEmpUserById);
router.put('/updateUser/:id', empController.updateUser);
router.delete('/deleteUser/:id', empController.deleteUser);

export default router;
