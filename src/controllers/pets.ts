import { Request, Response } from "express";

import PetModel from "../models/pet";

export const createPet = async (req: Request, res: Response) => {
  const post = req.body;
  const { userId } = req.params;

  const newPostMessage = new PetModel({
    ...post,
    owner: userId,
    createdAt: new Date().toISOString()
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ error });
  }
};

export const getPets = async (req: Request, res: Response) => {
  try {
    const pets = await PetModel.find();

    res.status(200).json({ result: pets });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPet = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const pet = await PetModel.find({ name: { $regex: name, $options: "i" } });

    res.status(200).json({ result: pet });
  } catch (error) {
    res.status(500).json({ error });
  }
};
