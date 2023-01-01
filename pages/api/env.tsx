import {NextApiRequest, NextApiResponse} from "next";

import {isUnauthorisedAPIRequest} from "../../handles/isUnauthorisedAPIRequest";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== "GET") {
        response.status(405).end();
        return;
    }
    if (isUnauthorisedAPIRequest(request, response)) return;

    const gist = await fetch("https://api.github.com/gists/" + process.env.ENV_GIST).then(y => y.json());
    const rawURL = gist?.files?.[".env"]?.["raw_url"];
    const file = rawURL ? await fetch(rawURL).then(y => y.text()) : "";
    response.status(200).send(file);
}
