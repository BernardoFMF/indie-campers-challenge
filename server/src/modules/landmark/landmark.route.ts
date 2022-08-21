import { Router } from "express";
import validate from "../../middlewares/validator.middleware";
import { fetchLandmarkByGeoSchema } from "./landmark.schema";
import { fetchLandmarkByGeo } from "./landmark.controller";
import asyncHandler from "express-async-handler";

const router = Router();

/**
 * Extra points functionality -> fetches the closest landmark, having as criteria latitude and longitude
 */
router.get("/geo", validate(fetchLandmarkByGeoSchema), asyncHandler(fetchLandmarkByGeo));

export default router;