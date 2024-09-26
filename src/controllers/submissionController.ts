import { Request, Response } from "express";
import { CreatingSubmissionDto } from "../dtos/creatingSubmissionDto";


function addSubmission(req: Request, res: Response) {
    console.log(1);
    const submissionDto = req.body as CreatingSubmissionDto;
    console.log(2);

    return res.status(201).json({
        success: true,
        error: {},
        message: "Successfully collected the submission",
        data: submissionDto
    });
}

export default addSubmission;