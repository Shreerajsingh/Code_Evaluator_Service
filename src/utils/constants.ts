export const PYTHON_IMAGE = "python:3.8-slim";

// This will represent the header size of the stream.
// docker header stream will contain data type of stream i.e. stdout/stderr
// and the length of data
export const DOCKER_STREAM_HEADER_SIZE = 8;     //In bytes