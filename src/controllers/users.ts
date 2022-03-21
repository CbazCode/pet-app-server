import * as bcryptjs from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Response, Request } from "express";

// Models
import UserModel from "../models/user";
// Config
import { SECRET_WORD } from "../config/constants";

const secret = SECRET_WORD ?? "";

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ error: { message: "User doesn't exist" } });

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      oldUser.password
    );

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ error: { message: "Invalid credentials" } });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h"
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res
        .status(400)
        .json({ error: { message: "User already exists" } });

    const hashedPassword = await bcryptjs.hash(password, 12);

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h"
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
