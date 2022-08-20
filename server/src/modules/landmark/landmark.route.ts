import { Router } from "express";
import validate from "../../middlewares/validator.middleware";
import { fetchLandmarkByGeoSchema } from "./landmark.schema";
import { fetchLandmarkByGeo } from "./landmark.controller";

const router = Router();

/**
 * Extra points functionality -> fetches the closest landmark having as criteria latitude and longitude
 */
router.get("/geo", validate(fetchLandmarkByGeoSchema), fetchLandmarkByGeo);

/**
 * Helper endpoint to add landmarks
 */

//router.post("/", validate(fetchLandmarkByGeoSchema), fetchLandmarkByGeo);

export default router;