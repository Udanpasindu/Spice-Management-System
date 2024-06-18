import express from 'express';
import {loginadmin, getallAdmins, createAdmin, deleteAdmin} from '../Controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/login/ad', loginadmin);
adminRouter.get('/details', getallAdmins);
adminRouter.post('/adding', createAdmin);
adminRouter.delete('/delete/:id', deleteAdmin);


export default adminRouter;
