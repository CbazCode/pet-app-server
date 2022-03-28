import { Request, Response } from "express";

import AppointmentModel from "../models/appointment";

export const createAppointment = async (req: Request, res: Response) => {
  const appointment = req.body;
  const { userId } = req.params;

  const newAppointment = new AppointmentModel({
    ...appointment,
    owner: userId
  });

  try {
    await newAppointment.save();

    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(409).json({ error });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  const { petId } = req.params;

  try {
    const appointments = await AppointmentModel.find({ petId });

    res.status(200).json({ result: appointments });
  } catch (error) {
    res.status(500).json({ error });
  }
};
