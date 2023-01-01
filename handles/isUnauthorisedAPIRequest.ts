import {NextApiRequest, NextApiResponse} from "next";

export function isUnauthorisedAPIRequest(request: NextApiRequest, response: NextApiResponse) {
    const {authorization} = request.headers;
    let authorized = false;
    // Was the token specified, is bearer, and matches the env one?
    if (authorization?.startsWith("Bearer")) {
        const token = authorization.substring("Bearer ".length);
        if (token === process.env.API_TOKEN) authorized = true;
    }
    if (authorized) return false;
    response.setHeader("WWW-Authenticate", "Bearer")
        .status(401)
        .send("Unauthorized");
    return true;
}
