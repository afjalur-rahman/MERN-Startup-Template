import UserModel from "../models/user.js";
import bcrypt from 'bcrypt'
import  jwt from "jsonwebtoken";

class UserController{
    static userRegistration = async(req,res)=>{
        const {name,email,password,confirm_password} = req.body
        const user = await UserModel.findOne({email:email})
        if(user){
            res.send({"status":"failed","message":"Email Already Exists"})
        }
        else {
            if(name && email && password && confirm_password){
                if(password === confirm_password){
                   try {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password,salt)
                    const doc = new UserModel({
                        name:name,
                        email:email,
                        password:hashPassword,
                        isAdmin:"false"
                    })
                    await doc.save()
                    const saved_user = await UserModel.findOne({email:email})
                    //GENERATE JWT TOKEN
                    //const token = jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'365d'})
                    
                    res.status(201).send({"status":"success","message":"Registration Successfull"})
                   } catch (error) {
                    res.send({"status":"failed","message":error})
                   }
                }
                else{
                    res.send({"status":"failed","message":"Password and Confirm Password Doesn't match"})
                }
            }
            else{
                res.send({"status":"failed","message":"All fields are required"})
            }
        }

        
    }

    static userLogin = async(req,res)=>{
        try {
            const {email, password}=req.body
            if(email && password){
                const user = await UserModel.findOne({email:email})
                if(user!=null){
                    const isMatch = await bcrypt.compare(password,user.password)
                    if((user.email === email) && isMatch){
                        //generate jwt token
                        const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'365d'})
                        res.send({"status":"success","message":"Login Successfull","token":token})
                    }
                    else{
                        res.send({"status":"failed","message":"Email or Password is not correct"})
                    }
                }
                else{
                    res.send({"status":"failed","message":"You are not a registered user"})
                }
            }
            else{
                res.send({"status":"failed","message":"All fields are required"})
            }
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":error})
        }
    }

    
    
    static loggedUser = async (req, res) =>{
        res.status(201).send({"status":"success","message":"Successfully fetch the data","user":req.user})
    }


    static deleteEmployee = async (req, res) => {
        try{
            await UserModel.deleteOne({_id: req.query.paramId});
            res.status(201).send({"status":"success","message":"Employee Deleted Successfull"})
        } catch (error){
            res.send({"status":"failed","message":error})      
        }
    }
   
    

}
export default UserController;