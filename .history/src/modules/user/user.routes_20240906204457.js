import { Router } from "express";
import * as UC from "./user.controller.js"

export const userRouter = Router()

userRouter.post('/signup' , UC.signUP)

userRouter.patch('/sendCode' , UC.forgetPassword)
userRouter.patch('/resetPassword' , UC.resetPassword)
userRouter.post('/signin' , UC.signIn)

userRouter.get('/signin', auth , UC.getUserProfile)


