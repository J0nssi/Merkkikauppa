import { Request } from "express";

function extractJwt(req: Request) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
}

export default extractJwt;