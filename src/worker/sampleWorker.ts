import { Job, Worker } from "bullmq";
import SampleJob from "../jobs/SampleJob";
import redisConnection from "../config/redisConfig";

function sampleWorker(queueName: string) {
    new Worker(
        queueName,
        async (job: Job) => {
            if(job.name === "SampleJob") {
                console.log("Sample job worker kicks in");
                const sampleJobInterface = new SampleJob(job.data);

                sampleJobInterface.handle(job);
            }

            return true;
        },
        { connection: redisConnection}
    );
};

export default sampleWorker;