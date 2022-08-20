import { Router } from "express";
import validate from "../../middlewares/validator.middleware";
import { fetchRoutesSchema } from "./route.schema";
import { fetchRoutes } from "./route.controller";

const router = Router();

/**
 * Main functionality -> fetches the routes that match the start and end point
 */
router.get("/", validate(fetchRoutesSchema), fetchRoutes);

/**
 * Helper endpoints to add routes, add landmarks to routes and change whether or not a landmark is a highlight in a route 
 */

//router.post("/", validate(fetchRoutesSchema), fetchRoutes);

//router.post("/:id/landmarks", validate(fetchRoutesSchema), fetchRoutes);

//router.patch("/:id", validate(fetchRoutesSchema), fetchRoutes);

export default router;