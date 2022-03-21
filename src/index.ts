import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";

// Connection to MongoDB
import { connectDB } from "./config/db";
// Routes
import userRoutes from "./routes/users";
import petsRoutes from "./routes/pets";
// Config
import { PORT } from "./config/constants";

dotenv.config();
connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/pets", petsRoutes);

app.get("/", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

app.listen(PORT, () => {
  return console.log(`server is listening on ${PORT}`);
});
