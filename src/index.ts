import express, {Express} from "express";

import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";
import sampleProducer from "./producer/sampleQueueProducer";
import sampleWorker from "./worker/sampleWorker";

const app: Express = express();     // No need to put Type:"Epress" bcs express() tself return that.

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port: ${serverConfig.PORT}`);

    sampleWorker('SampleQueue');

    sampleProducer('SampleJob', {
        name: 'Shreeraj',
        role: 'SDE 1',
        company: 'Google',
        location: 'Remote | Noida | Benglore'
    });
});