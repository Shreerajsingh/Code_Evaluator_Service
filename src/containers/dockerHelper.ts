import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";

function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
    let offset = 0;
    const output: DockerStreamOutput = { stdout: '', stderr: '' };
    
    // console.log(">>>>>   ",buffer.length);
    // console.log(buffer[0], buffer[1], buffer[2], buffer[3])
    while (offset < buffer.length) {
        // Channel is read from the first byte of the buffer (type of stream: stdout/stderr)
        const typeOfStream = buffer[offset];
        
        // The length is stored in the next 4 bytes after the typeOfStream (offset + 1 to offset + 5)
        const length = buffer.readUInt32BE(offset + 4);

        // Move forward by the header size (8 bytes)
        offset += DOCKER_STREAM_HEADER_SIZE;

        if (typeOfStream === 1) {
            // stdout
            output.stdout += buffer.toString('utf-8', offset, offset + length);
        } else if (typeOfStream === 2) {
            // stderr
            output.stderr += buffer.toString('utf-8', offset, offset + length);
        }

        // Move the offset by the length of the payload to the next chunk
        offset += length;
    }

    return output;
}


export default decodeDockerStream;