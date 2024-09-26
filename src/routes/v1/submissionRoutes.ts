import express from "express";
import addSubmission from "../../controllers/submissionController";
import validateCreateSubmissionDto from "../../validators/creatingSubmissionValidator";
import { creatingSubmissionZodSchema } from "../../dtos/creatingSubmissionDto";

const submissionRouter = express.Router();

submissionRouter.post(
    '/', 
    validateCreateSubmissionDto(creatingSubmissionZodSchema),
    addSubmission
);

export default submissionRouter;