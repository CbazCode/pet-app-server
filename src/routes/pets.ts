import * as express from "express";

// Middleware
import auth from "../middleware/auth";
// Controllers
import { getPets, getPet, createPet } from "../controllers/pets";

const router = express.Router();

router.get("/", getPets);
router.get("/:name", getPet);
router.post("/", auth, createPet);

export default router;
