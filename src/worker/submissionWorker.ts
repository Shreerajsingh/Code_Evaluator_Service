import { Job, Worker } from "bullmq";
import SubmissionJob from "../jobs/SubmissionJob";
import redisConnection from "../config/redisConfig";

function submissionWorker(queueName: string) {
    new Worker(
        queueName,
        async (job: Job) => {
            if(job.name == "SubmissionJob") {
                console.log("Submission worker kicks in");
                console.log(job.data);
                const submissionJobInterface = await new SubmissionJob(job.data);

                await submissionJobInterface.handle(job);
            }
            return true;
        },
        {connection: redisConnection}
    );

}

export default submissionWorker;