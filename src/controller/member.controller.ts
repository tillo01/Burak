import express, { Request ,Response} from "express";
import { T } from '../libs/types/common';
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import MemberService from "../models/Member.service";
import Errors from "../libs/types/Errors";

const memberService = new MemberService();

const memberController: T = {};
// REACT

memberController.signup = async (req:Request, res:Response) =>{
  try {
    console.log("signup");
    const input:MemberInput = req.body,
   result:Member = await memberService.signup(input);
  res.json({ member:result});

} catch (err) {
  console.log("Error signup", err);
  if(err instanceof Errors) res.status(err.code).json(err);
else res.status(Errors.standard.code) .json(Errors.standard);
  // res.json({ });
  
    
}
}



memberController.login = async (req:Request, res:Response) =>{
  try {
    console.log("login");
    const input:LoginInput = req.body,
     result = await memberService.login(input);
     res.json({ member:result});

    //  TO Do TOKEns
    
  } catch (err) {
    console.log("Error, on login",err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code) .json(Errors.standard);
    
  }
}



export default memberController;