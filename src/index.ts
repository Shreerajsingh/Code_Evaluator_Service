import express, {Express} from "express";

import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";

const app: Express = express();     // No need to use Type:"Epress" bcs express() tself return that.

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port: ${serverConfig.PORT}`);
})