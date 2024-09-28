// import Docker from "dockerode";
import { JAVA_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";


async function runJava(code: string, inputTestCase: string) {
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

    await javaDockerContainer.remove();
}

export default runJava;