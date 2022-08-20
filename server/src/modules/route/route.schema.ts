import { object, string, TypeOf } from "zod";

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

export type FetchRoutesQuery = TypeOf<typeof fetchRoutesSchema>;