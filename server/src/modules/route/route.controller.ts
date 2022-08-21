import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FetchRoutesQuery } from "./route.schema";
import { findRoutesByLocation, findRouteById } from "./route.service";

export async function fetchRoutes(req: Request<{}, FetchRoutesQuery, {}>, res: Response) {
    const { start_location, end_location } = req.query

    const routes = await findRoutesByLocation(String(start_location), String(end_location));

    return res.status(StatusCodes.OK).json(routes);
}

export async function fetchRouteById(req: Request, res: Response) {
    const { id } = req.params;

    const route = await findRouteById(Number(id));

    if (!route) return res.status(StatusCodes.NOT_FOUND).json({ message: "Route not found" });

    return res.status(StatusCodes.OK).json(route);
}