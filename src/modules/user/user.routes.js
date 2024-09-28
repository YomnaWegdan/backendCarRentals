import { Router } from "express";
import * as UC from "./user.controller.js"
import {auth} from '../../middlewares/auth.js'
import { validation } from "../../middlewares/validate.js";
import * as UV from "./user.validate.js"

const userRouter = Router()
userRouter.get('/' , auth(['user', 'admin']) , UC.getUsers)

userRouter.post('/signup' , validation(UV.signupValidation) , UC.signUP)

userRouter.patch('/sendCode'  , UC.forgetPassword)
userRouter.patch('/resetPassword' , UC.resetPassword)
userRouter.post('/signin' ,validation(UV.loginValidation) , UC.signIn)

userRouter.get('/getprofile', auth(['user', 'admin']) , UC.getUserProfile)

export default userRouter


