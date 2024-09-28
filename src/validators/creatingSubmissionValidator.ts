import { ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";


const validateCreateSubmissionDto  = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            ... req.body   // Destructuring req body
        })

        next();
    } catch(error) {
        console.log(error);
        return res.status(400).json({
            message: "Bad Request"
        })
    }
};

export default validateCreateSubmissionDto;