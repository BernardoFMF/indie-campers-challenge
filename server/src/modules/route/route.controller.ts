import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { StatusError } from "../../middlewares/error.middleware";
import { FetchRoutesQuery } from "./route.schema";
import { findRoutesByLocation, findRouteById } from "./route.service";

export async function fetchRoutes(req: Request<{}, FetchRoutesQuery, {}>, res: Response, next: NextFunction) {
    const { start_location, end_location } = req.query

    const routes = await findRoutesByLocation(String(start_location), String(end_location));

    res.status(StatusCodes.OK).json(routes);
}

export async function fetchRouteById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const route = await findRouteById(Number(id));

    if (!route) throw new StatusError(StatusCodes.NOT_FOUND, "Route not found");

    res.status(StatusCodes.OK).json(route);
}