import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyZodObject } from "zod";

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {        
        let parsedAndValidated = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });

        // Will update the request to match the defined schema
        // for example: parse the latitude and longitude to int and save it in the query property
        if (parsedAndValidated.body) req.body = parsedAndValidated.body
        if (parsedAndValidated.query) req.query = parsedAndValidated.query
        if (parsedAndValidated.params) req.params = parsedAndValidated.params
        
        return next();
    } catch (error) {        
        return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
};

export default validate