// import Docker from "dockerode";
import CodeExecutorStrategy, { ExecutionResponse } from "../types/codeExecutorStrategy";
import { CPP_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";


class CppExecutor implements CodeExecutorStrategy {
    async execute(code: string, inputTestCase: string) : Promise<ExecutionResponse> {
        console.log("Initilizing cpp Dock Cont");

        const rawLogBuffer: Buffer[] = [];

        const runCommand = `echo '${code.replace(/'/g, `\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `\\"`)}' | stdbuf -oL -eL ./main`;
        
        // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ["python3", "-c", code, "stty -echo"]);
        const cppDockerContainer = await createContainer(CPP_IMAGE, [
            "/bin/sh",
            "-c",
            runCommand]
        );

        // Starting / booting the docker container
        await cppDockerContainer.start();

        console.log("Started the docker container");

        const loggerStream = await cppDockerContainer.logs({ 
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
            console.log(">>> ",response);
            return {output: response, status: "COMPLETED"};
        } catch (error) {
            return {output: error as string, status: "ERROR"};
        } finally {
            await cppDockerContainer.remove();
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

export default CppExecutor;