import { Router } from "express";
import validate from "../../middlewares/validator.middleware";
import { fetchRoutesSchema, fetchRouteByIdSchema } from "./route.schema";
import { fetchRoutes, fetchRouteById } from "./route.controller";
import asyncHandler from "express-async-handler";

const router = Router();

/**
 * Main functionality -> fetches the routes that match the start and end point
 */
router.get("/search", validate(fetchRoutesSchema), asyncHandler(fetchRoutes));

/**
 * Main functionality -> fetch specific route
 */
 router.get("/:id", validate(fetchRouteByIdSchema), asyncHandler(fetchRouteById));

export default router;