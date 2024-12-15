"use client";

import Link from "next/link";
import {redirect} from "next/navigation";
import React, {useEffect, useState} from "react";

import * as cheerio from "cheerio";

import JavadocTable from "./JavadocTable";

export default function ClassUse({body, url}: {body: string, url: string}) {
    const [hash, setHash] = useState("");

    useEffect(() => {
        const save = () => setHash(window.location.hash);
        window.addEventListener("hashchange", save);
        save();

        return () => window.removeEventListener("hashchange", save);
    }, []);

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
