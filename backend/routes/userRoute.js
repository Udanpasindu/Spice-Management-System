import express from 'express';
import {loginUser, registerUser, getUserProfile,updateUsername,updateEmail,updatePassword} from "../Controllers/UserController.js"

const userRouter = express.Router()

userRouter.post('/login', loginUser)
userRouter.post('/register', registerUser)
userRouter.get('/getuser', getUserProfile)
userRouter.post('/updateUsername', updateUsername);
userRouter.post('/updateEmail', updateEmail);
userRouter.post('/updatePassword', updatePassword);



export default userRouter;