import { Router } from "express";
import validate from "../../middlewares/validator.middleware";
import { fetchRoutesSchema, fetchRouteByIdSchema } from "./route.schema";
import { fetchRoutes, fetchRouteById } from "./route.controller";

const router = Router();

/**
 * Main functionality -> fetches the routes that match the start and end point
 */
router.get("/", validate(fetchRoutesSchema), fetchRoutes);

/**
 * Main functionality -> fetch specific route
 */
 router.get("/:id", validate(fetchRouteByIdSchema), fetchRouteById);

export default router;