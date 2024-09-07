import { Router } from "express";
import * as UC from "./user.controller.js"
auth

export const userRouter = Router()

userRouter.post('/signup' , UC.signUP)

userRouter.patch('/sendCode' , UC.forgetPassword)
userRouter.patch('/resetPassword' , UC.resetPassword)
userRouter.post('/signin' , UC.signIn)

userRouter.get('/getprofile', auth('user', 'admin') , UC.getUserProfile)


