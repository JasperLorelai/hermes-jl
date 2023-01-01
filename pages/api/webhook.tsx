import {NextApiRequest, NextApiResponse} from "next";

import {isUnauthorisedAPIRequest} from "../../handles/isUnauthorisedAPIRequest";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== "GET") {
        response.status(405).end();
        return;
    }
    if (isUnauthorisedAPIRequest(request, response)) return;

    response.status(200).send(process.env.WEBHOOK);
}
