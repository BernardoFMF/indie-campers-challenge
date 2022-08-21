import { number, object, string, TypeOf } from "zod";

export const fetchRoutesSchema = object({
  query: object({
    start_location: string({
      required_error: "start_location is required",
    }),
    end_location: string({
      required_error: "end_location is required",
    })
  })
});

export const fetchRouteByIdSchema = object({
  params: object({
    id: string({
      required_error: "id is required",
    }).refine((s) => {
      const n = Number(s);   
      return Number.isFinite(n) && !Number.isNaN(n);
    })
    .transform(Number)
  })
});

export type FetchRoutesQuery = TypeOf<typeof fetchRoutesSchema>["query"];

export type FetchRouteByIdParams = TypeOf<typeof fetchRouteByIdSchema>["params"];