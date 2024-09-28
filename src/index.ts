import express, {Express} from "express";

import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";
import sampleWorker from "./worker/sampleWorker";
import bodyParser from "body-parser";
import submissionWorker from "./worker/submissionWorker";
import { Submission_Queue } from "./utils/constants";
import submissionProducer from "./producer/submissionQueueProducer";

const app: Express = express();     // No need to put Type:"Epress" bcs express() tself return that.

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port: ${serverConfig.PORT}`);

    sampleWorker('SampleQueue');
    submissionWorker(Submission_Queue);

    const code = `
    #include <iostream>
    using namespace std;

    int main(){
	    for(int i=0;i<3;i++) {
		    for ( int j=0;j<3;j++) {
		        cout<<"* ";
            }
            cout<<endl;
	    }
        cout<<endl;
        return 0;
    }
    `;

    const inputCase = `10`;

    submissionProducer("SubmissionJob", {
        "1234": {
            language: "cpp",
            inputCase,
            code,
        }
    });
});