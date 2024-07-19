/** @format */

import { Request, Response } from "express";
import { T } from "../libs/types/common";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import MemberService from "../models/Member.service";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/types/config";

const memberService = new MemberService();
const authService = new AuthService();

const memberController: T = {};
// REACT

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    const input: MemberInput = req.body,
      result: Member = await memberService.signup(input);
    const token = await authService.createToken(result);

    res.cookie("accesToken", token, { maxAge: AUTH_TIMER * 3600 * 1000, httpOnly: false });

    res.status(HttpCode.CREATED).json({ member: result, accesToken: token });
  } catch (err) {
    console.log("Error signup", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const input: LoginInput = req.body,
      result = await memberService.login(input),
      token = await authService.createToken(result);
    console.log("tokens =>", token);

    res.cookie("accesToken", token, { maxAge: AUTH_TIMER * 3600 * 1000, httpOnly: false });

    res.status(HttpCode.OK).json({ member: result, accesToken: token });
  } catch (err) {
    console.log("Error, on login", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.verifyAuth = async (req: Request, res: Response) => {
  try {
    let member = null;
    const token = req.cookies["accesToken"];
    console.log("req.token=>", token);
    if (token) member = await authService.checkAuth(token);
    if (!member) throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHNTICATED);
    console.log("member", member);
    res.status(HttpCode.OK).json({ member: member });
  } catch (err) {
    console.log("Error, on verifyAuth", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default memberController;
