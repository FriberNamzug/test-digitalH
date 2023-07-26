import { Router } from "express";
import descifrar from "../controllers/descifrar.controller.js";

const router = Router();

router.post("/", descifrar);


export default router;