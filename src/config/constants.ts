import * as dotenv from "dotenv";
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 5000;
export const SECRET_WORD = process.env.SECRET_WORD;
