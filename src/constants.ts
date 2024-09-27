import { config } from "dotenv";
config();

export const ClientBaseURL = process.env.FRONTEND_BASE_URL;
export const APIBaseURL = process.env.API_BASE_URL;
