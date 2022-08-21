import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { FetchLandmarkByGeoQuery } from "./landmark.schema";
import { findClosestLandmark } from "./landmark.service";

export async function fetchLandmarkByGeo(req: Request<{}, FetchLandmarkByGeoQuery, {}>, res: Response, next: NextFunction) {
    const { latitude, longitude } = req.query

    const landmark = await findClosestLandmark(Number(latitude), Number(longitude));

    res.status(StatusCodes.OK).json(landmark);
}