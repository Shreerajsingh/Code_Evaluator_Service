import Docker from "dockerode";

async function createContainer(imageName: string, cmdExecutable: string[]) {
    const docker = new Docker();

    const container = await docker.createContainer({
        Image: imageName,
        Cmd: cmdExecutable,
        AttachStdin: true,      //To enable input stream
        AttachStdout: true,     //To enable output stream
        AttachStderr: true,     //To enable error stream
        Tty: false,
        OpenStdin: true         //Keep the input stream open even no interaction there
    });

    return container;
}

export default createContainer;