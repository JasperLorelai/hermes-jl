import * as crypto from "crypto";

import {NextApiRequest, NextApiResponse} from "next";

import {Config} from "../../handles/Config";
import {isUnauthorisedAPIRequest} from "../../handles/isUnauthorisedAPIRequest";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== "GET") {
        response.status(405).end();
        return;
    }
    if (isUnauthorisedAPIRequest(request, response)) return;

    const params = new URLSearchParams();
    params.append("_MulticraftAPIMethod", "restartServer");

    params.append("_MulticraftAPIUser", process.env.MULTICRAFT_USER || "");
    params.append("id", Config.multicraft.serverId);
    let hmacData = "";
    params.forEach((value, key) => hmacData += key + value);
    const hmacDigest = crypto
        .createHmac("sha256", process.env.MULTICRAFT_KEY || "")
        .update(hmacData)
        .digest("hex");
    params.append("_MulticraftAPIKey", hmacDigest);

    const reply = await fetch(`${Config.urls.multicraftAPI}?${params}`, {
        headers: {
            "User-Agent": process.env.MULTICRAFT_USER || "",
            Referer: Config.multicraft.referer
        }
    });
    response.status(200).json(await reply.json());
}
