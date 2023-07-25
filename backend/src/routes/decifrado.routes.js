import { Router } from "express";
import decifrar from "../controllers/decifrar.controller.js";

const router = Router();

router.get("/", decifrar);


export default router;