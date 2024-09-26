import express, {Express} from "express";

import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";
import sampleWorker from "./worker/sampleWorker";
import bodyParser from "body-parser";

const app: Express = express();     // No need to put Type:"Epress" bcs express() tself return that.

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port: ${serverConfig.PORT}`);

    sampleWorker('SampleQueue');
});