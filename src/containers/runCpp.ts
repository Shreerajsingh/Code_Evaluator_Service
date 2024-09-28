// import Docker from "dockerode";
import DockerStreamOutput from "../types/dockerStreamOutput";
import { CPP_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";


async function runCpp(code: string, inputTestCase: string) {
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

    const response: DockerStreamOutput = await new Promise((res) => {
        loggerStream.on('end', () => {
            console.log(rawLogBuffer);
            // Let's concat all the chunks all together
            const completeBuffer = Buffer.concat(rawLogBuffer);
    
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log(decodedStream);
            console.log(decodedStream.stdout);
            
            res(decodedStream);
        });
    })

    await cppDockerContainer.remove();

    return response;
}

export default runCpp;