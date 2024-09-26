// export interface CreatingSubmissionDto {
//     userId: string,
//     problemId: string,
//     language: string,
//     code: string
// }

import { z } from "zod";

export type CreatingSubmissionDto = z.infer<typeof creatingSubmissionZodSchema>;

export const creatingSubmissionZodSchema = z.object({
    userId: z.string(),
    problemId: z.string(),
    language: z.string(),
    code: z.string()
});
// we can use .strict() with creatingSubmissionZodSchema to resist passing extra details.