import React from "react";
import Link from "next/link";
import {redirect} from "next/navigation";

import * as cheerio from "cheerio";

import JavadocTable from "./JavadocTable";

export default function ClassUse({body, url, hash}: {body: string, url: string, hash: string}) {
    const $ = cheerio.load(body);
    const classUseSummary = $(hash.replaceAll(".", "\\.") + " > div.summary-table").first();

    if (!hash) return (
        <div className="text-center">
            <div className="text-danger display-5 lh-lg">No hash</div>
            <Link href={url}>
                <button className="btn btn-dark btn-outline-danger">View Javadocs instead</button>
            </Link>
        </div>
    );

    if (!classUseSummary.length) redirect(url);
    return (<JavadocTable $={$} summary={classUseSummary} />);
}
