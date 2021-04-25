import {Request, Response, NextFunction} from "express";

//Middleware for printing request
function printReq(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.path}`)
    console.log(req.body);
	console.log('================');
    next();
}

export default printReq;