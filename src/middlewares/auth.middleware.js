import dotenv from 'dotenv'
import jwt, { decode } from "jsonwebtoken";
import userService from '../services/user.service.js';

dotenv.config()

export const authMiddleware = async (req,res,next) =>{
  try{

   const {authorization} = req.headers

    if (!authorization) return res.status(401).send("Authorization header is missing");
    
    const parts = authorization.split(" ")
    if (parts.length !== 2) return res.send(401);
 
    const [schema,token] = parts 

    if (schema !== "Bearer") return res.send(401);

    jwt.verify(token,process.env.SECRET_JWT, async (error,decoded)=>{
        if (error) return res.status(401).send("Invalid Token");

  
        const user = await userService.findByIdService(decoded.id)
       
        if (!user ||!user.id) return res.status(401).send("Invalid Token");
        
        req.userId= decoded.id

       return next();
    })

   
  }catch(err){
    res.status(500).send({ message: err.message });
  }

}