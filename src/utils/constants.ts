export const PYTHON_IMAGE = "python:3.8-slim";      // docker pull python:3.8-slim
export const JAVA_IMAGE = "openjdk:11-jdk-slim";    // docker pull openjdk:11-jdk-slim
export const CPP_IMAGE = "gcc:latest";              // docker pull gcc:latest

export const Submission_Queue = "SubmissionQueue";

// This will represent the header size of the stream.
// docker header stream will contain data type of stream i.e. stdout/stderr
// and the length of data
export const DOCKER_STREAM_HEADER_SIZE = 8;     //In bytes