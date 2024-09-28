// import Docker from "dockerode";
import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";


async function runPython(code: string, inputTestCase: string) {
    console.log("Initilizing Pyth Dock Cont");

    const rawLogBuffer: Buffer[] = [];

    const runCommand = `echo '${code.replace(/'/g, `\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `\\"`)}' | python3 test.py`;
    
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ["python3", "-c", code, "stty -echo"]);
    const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
        "/bin/sh",
        "-c",
        runCommand]
    );

    // Starting / booting the docker container
    await pythonDockerContainer.start();

    console.log("Started the docker container");

    const loggerStream = await pythonDockerContainer.logs({ 
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true        //wether the logs are streamed or returned as a string
    })

    loggerStream.on('data', (chunk) => {
        rawLogBuffer.push(chunk);
    })

    await new Promise((res) => {
        loggerStream.on('end', () => {
            console.log(rawLogBuffer);
            // Let's concat all the chunks all together
            const completeBuffer = Buffer.concat(rawLogBuffer);
    
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log(decodedStream);
            
            res(decodeDockerStream);
        });
    })

    await pythonDockerContainer.remove();
}

export default runPython;