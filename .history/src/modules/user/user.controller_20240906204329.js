import { userModel } from "../../models/user.model.js"
import { appError } from "../../utilities/appError.js"
import jwt from 'jsonwebtoken'
import sendEmail from "../../utilities/email.js"
import { compareSync, hashSync } from "bcrypt"
import { catchError } from "../../middlewares/asyncHandlerError.js"
import { customAlphabet } from "nanoid"
const signUP = catchError(async (req , res , next) =>{

    const {email  } = req.body
    const user = await userModel.findOne({email:email.toLowerCase()})
    if(user) return next(new appError('user already exists') , 409) 
   
    req.body.password = hashSync(req.body.password , 10)

    const users = await userModel.create(req.body) 
    users[0].password = undefined 

    res.status(201).json({message :'success' , users }) 
})





const forgetPassword = catchError( async (req , res , next) =>{
    const {email} = req.body;
    const user = await userModel.findOne({email})
    if(!user) return next(new appError('user not found' , 404)) 
    
    const code = customAlphabet('1234567890', 5)
    const newCode = code()

    await sendEmail(email , `<h1>Your Code is ${newCode}</h1>`)
    await userModel.updateOne({email:email.toLowerCase()} , {code:newCode})
    res.status(200).json({message :'success' })
})

const resetPassword = catchError( async (req , res , next) =>{
    const {email , code , password} = req.body;
    const user =await userModel.findOne({email:email.toLowerCase() , code , passwordChangeAt:Date.now()})
    if(!user) return next(new appError('user not found' , 404)) 
    if(user.code != code || code == '') return next(new appError('invalid code' , 404))
    
    const newPassword=hashSync(password,10)
    await userModel.updateOne({email:email.toLowerCase() },{ password:newPassword , code :''})
    res.status(200).json({message :'success' })
})

const signIn = catchError(async (req , res , next) =>{
    const {email  , password} = req.body;
    const user =await userModel.findOne({email:email.toLowerCase()})
    if(!user) return next(new appError('user not found' , 404)) 
    if(user.confirmed == false) return next(new appError('user not confirmed' , 404))
    if(!compareSync(password,user.password)) return next(new appError('invalid password' , 404))

    const token = jwt.sign({email} , process.env.signatureKey )
    await userModel.updateOne({email:email.toLowerCase()} , {loggedIn:true})

    
    res.status(200).json({message :'success' , token })
})

const getUserProfile = catchError(async(req , res , next)=>{
    const user = await userModel.findById(req.user._id)
    if(!user) return next(new appError('user not found' , 404))     
    res.status

    i

})

export {
    signUP  , forgetPassword , resetPassword , signIn
}