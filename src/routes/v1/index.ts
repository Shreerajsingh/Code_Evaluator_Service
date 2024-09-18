import express from "express";
import pingController from "../../controllers/pingController";

const v1Router = express.Router();

v1Router.get('/ping', pingController)

export default v1Router;