import { object, string, TypeOf } from "zod";

export const fetchLandmarkByGeoSchema = object({
    query: object({
        latitude: string({
            required_error: "latitude is required",
        }).refine((s) => {
            const n = Number(s);
            return Number.isFinite(n) && !Number.isNaN(n);
        }).transform(Number),
        longitude: string({
            required_error: "longitude is required",
        }).refine((s) => {
            const n = Number(s);
            return Number.isFinite(n) && !Number.isNaN(n);
        }).transform(Number)
    })
});

export type FetchLandmarkByGeoQuery = TypeOf<typeof fetchLandmarkByGeoSchema>["query"];