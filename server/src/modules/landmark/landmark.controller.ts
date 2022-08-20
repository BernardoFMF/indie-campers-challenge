import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { fetchLandmarkByGeoQuery } from "./landmark.schema";
import { findClosestLandmark } from "./landmark.service";

export async function fetchLandmarkByGeo(req: Request<{}, fetchLandmarkByGeoQuery["query"], {}>, res: Response) {
    const { latitude, longitude } = req.query

    const landmark = await findClosestLandmark(Number(latitude), Number(longitude));

    return res.status(StatusCodes.OK).json(landmark);
}