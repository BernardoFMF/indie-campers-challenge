import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FetchLandmarkByGeoQuery } from "./landmark.schema";
import { findClosestLandmark } from "./landmark.service";

export async function fetchLandmarkByGeo(req: Request<{}, FetchLandmarkByGeoQuery, {}>, res: Response) {
    const { latitude, longitude } = req.query

    const landmark = await findClosestLandmark(Number(latitude), Number(longitude));

    return res.status(StatusCodes.OK).json(landmark);
}