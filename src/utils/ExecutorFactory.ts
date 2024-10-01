import JavaExecutor from "../containers/JavaExecutor";
import PythonExecutor from "../containers/PythonExecutor";
import CppExecutor from "../containers/CppCompiler";
import CodeExecutorStrategy from "../types/codeExecutorStrategy";

function createExecutor(language: string) : CodeExecutorStrategy | null{
    if(language === "CPP") {
        return new CppExecutor();
    } else if(language === "JAVA") {
        return new JavaExecutor();
    } else if(language === "PYTHON") {
        return new PythonExecutor();
    } else {
        return null;
    }
}

export default createExecutor;