import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FetchRoutesQuery } from "./route.schema";
import { findRoutesByLocation } from "./route.service";

export async function fetchRoutes(req: Request<{}, FetchRoutesQuery["query"], {}>, res: Response) {
    const { start_location, end_location } = req.query

    const routes = await findRoutesByLocation(String(start_location), String(end_location));

    return res.status(StatusCodes.OK).json(routes);
}