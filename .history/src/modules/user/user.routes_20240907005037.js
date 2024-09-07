import { Router } from "express";
import * as UC from "./user.controller.js"
import {auth} from '../../middlewares/auth.js'
import { validation } from "../../middlewares/validate.js";


const userRouter = Router()

userRouter.post('/signup' , validation(UV.signUpValidation) , UC.signUP)

userRouter.patch('/sendCode'  , UC.forgetPassword)
userRouter.patch('/resetPassword' , UC.resetPassword)
userRouter.post('/signin' ,validation(UV.signInValidation) , UC.signIn)

userRouter.get('/getprofile', auth(['user', 'admin']) , UC.getUserProfile)

export default userRouter


