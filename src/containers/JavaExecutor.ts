// import Docker from "dockerode";
import CodeExecutorStrategy, { ExecutionResponse } from "../types/codeExecutorStrategy";
import { JAVA_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";


class JavaExecutor implements CodeExecutorStrategy {
    async execute(code: string, inputTestCase: string) : Promise<ExecutionResponse> {
        console.log("Initilizing Java Dock Cont");

        const rawLogBuffer: Buffer[] = [];

        const runCommand = `echo '${code.replace(/'/g, `\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `\\"`)}' | java Main`;
        
        // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ["python3", "-c", code, "stty -echo"]);
        const javaDockerContainer = await createContainer(JAVA_IMAGE, [
            "/bin/sh",
            "-c",
            runCommand]
        );

        // Starting / booting the docker container
        await javaDockerContainer.start();

        console.log("Started the docker container");

        const loggerStream = await javaDockerContainer.logs({ 
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true        //wether the logs are streamed or returned as a string
        })

        loggerStream.on('data', (chunk) => {
            rawLogBuffer.push(chunk);
        })

        try {
            const response: string = await this.fetchDecodedStream(loggerStream, rawLogBuffer);
            return {output: response, status: "COMPLETED"};
        } catch (error) {
            return {output: error as string, status: "ERROR"};
        } finally {
            await javaDockerContainer.remove();
        }
    }

    fetchDecodedStream(loggerStream: NodeJS.ReadableStream, rawLogBuffer: Buffer[]): Promise<string> {
        return new Promise((res, rej) => {
            loggerStream.on('end', () => {
                console.log(rawLogBuffer);
                // Let's concat all the chunks all together
                const completeBuffer = Buffer.concat(rawLogBuffer);
            
                const decodedStream = decodeDockerStream(completeBuffer);
                console.log(decodedStream);

                if(decodedStream.stderr) {
                    rej(decodedStream.stderr);
                } else {
                    res(decodedStream.stdout);
                }
            });
        })
    }
}

export default JavaExecutor;