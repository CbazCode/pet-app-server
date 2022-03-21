import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "@interfaces/global.interfaces";
import { SECRET_WORD } from "../config/constants";

const secret = SECRET_WORD ?? "";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] ?? "";

    //This is from google Auth
    if (!token) {
      return res
        .status(401)
        .json({ error: { message: "Access denied. No token provided." } });
    }
    const isCustomAuth = token.length < 500;

    let decodedData: JwtPayload;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret) as JwtPayload;

      req.params.userId = decodedData.id;
    } else {
      //This is for the google token
      decodedData = jwt.decode(token) as JwtPayload;
      //Sub is google name for specific ID
      req.params.userId = decodedData?.sub ?? "";
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
