import {NextRequest, NextResponse} from "next/server";

import {handleAuthorisation} from "../../handles/Authorisation";

export async function GET(request: NextRequest) {
    const authorisationData = handleAuthorisation(request);
    if (authorisationData.unauthorised) return authorisationData.response;
    return new NextResponse(process.env.WEBHOOK, {status: 200});
}
