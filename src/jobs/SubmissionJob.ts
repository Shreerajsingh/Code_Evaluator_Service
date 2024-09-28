import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefination";
import { submissionPayload } from "../types/submissionPayload";
import runCpp from "../containers/runCpp";


class SubmissionJob implements IJob {
    name: string;
    payload: Record<string, submissionPayload>;

    constructor(payload: Record<string, submissionPayload>) {
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle = async (job?: Job) => {
        console.log("Handler of job called");
        console.log(this.payload);
        if(job) {
            const key = Object.keys(this.payload)[0];

            const language = this.payload[key].language;

            if(language === 'cpp') {
                const response = await runCpp(this.payload[key].code, this.payload[key].inputCase);

                console.log("Evaluated response is", response);
            }
        }
    } 

    failed = (job?: Job) => {
        if(job) {
            console.log(job.name, job.id, job.data);
        }
    }
}

export default SubmissionJob;