import express from "express";
import { getDataProfile } from "../controller/profile.controller";
const router = express.Router();





router.get("/", getDataProfile);


export default router;