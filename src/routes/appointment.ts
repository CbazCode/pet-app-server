import * as express from "express";

// Middleware
import auth from "../middleware/auth";

const router = express.Router();

import { getAppointments, createAppointment } from "../controllers/appointment";

router.get("/:petId", getAppointments);
router.post("/", auth, createAppointment);

export default router;
