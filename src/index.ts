import express, {Express} from "express";

import serverConfig from "./config/serverConfig";

const app: Express = express();     // No need to use Type:"Epress" bcs express() tself return that.

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port: ${serverConfig.PORT}`);
})