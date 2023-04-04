import {NextRequest, NextResponse} from "next/server";

type AuthorisationData = {
    unauthorised: boolean,
    response?: NextResponse
}


export function handleAuthorisation(request: NextRequest): AuthorisationData {
    const authorization = request.headers.get("authorization") || "";

    // Was the token specified, is bearer, and matches the env one?
    const unauthorised: AuthorisationData = {
        unauthorised: true,
        response: new NextResponse("Unauthorized", {
            status: 401,
            headers: {"WWW-Authenticate": "Bearer"}
        })
    };
    if (!authorization.startsWith("Bearer")) return unauthorised;
    const token = authorization.substring("Bearer ".length);
    if (token !== process.env.API_TOKEN) return unauthorised;

    return {unauthorised: false};
}
