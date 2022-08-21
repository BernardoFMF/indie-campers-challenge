import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.query);
        console.log(req.params);
        
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

        console.log(req.query);
        console.log(req.params);
        
        return next();
    } catch (error) {        
        return res.status(400).json(error);
    }
};

export default validate