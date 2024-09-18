import {Request, Response} from "express";

function pingController(req: Request, res: Response) {
    console.log("Ayo ping check", req.url);
    return res.json({message: "Womp wOmp"});
}

export default pingController;
