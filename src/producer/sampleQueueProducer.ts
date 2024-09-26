import sampleQueue from "../queues/sampleQueue";

const sampleProducer = async function(name: string, payload: Record<string, unknown>) {
    await sampleQueue.add(name, payload);
    console.log("successfully added a new job", `: ${name} ${payload.name}`);
}

export default sampleProducer;