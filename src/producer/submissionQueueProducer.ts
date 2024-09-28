import submissionQueue from "../queues/submissionQueue";

async function submissionProducer(name: string, payload: Record<string, unknown>) {
    await submissionQueue.add(name, payload);
    console.log("successfully added a new job", `: ${name}, ${payload}`);
}

export default submissionProducer;