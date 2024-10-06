import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefination";
import { submissionPayload } from "../types/submissionPayload";
import CodeExecutorStrategy from "../types/codeExecutorStrategy";
import createExecutor from "../utils/ExecutorFactory";

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

            const {language, code, inputTestCase, outputTestCase} = this.payload[key];

            const codeExecutor: CodeExecutorStrategy | null = createExecutor(language);

            if(codeExecutor != null) {
                const response = await codeExecutor.execute(code, inputTestCase, outputTestCase);
                if(response.status == "COMPLETED") {
                    console.log("Code executed successfully");
                } else {
                    console.log("Somthing went wrong with code execution");
                }
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