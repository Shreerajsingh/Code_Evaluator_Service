import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefination";

class SampleJob implements IJob {
    name: string;
    payload: Record<string, unknown>;

    constructor(payload: Record<string, unknown>) {
        this.payload = payload;
        this.name = this.constructor.name;
    }

    handle = (job?: Job) => {
        if(job) {
            console.log(job.name, job.id, job.data);
        }
    }

    failed = (job? : Job) : void => {
        console.log("Job Failed", (job)? job.id : undefined);
    }
}

export default SampleJob;