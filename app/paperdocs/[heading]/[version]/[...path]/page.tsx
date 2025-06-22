"use cache";

import React from "react";
import {redirect} from "next/navigation";
import {cacheLife} from "next/dist/server/use-cache/cache-life";

import * as cheerio from "cheerio";
import {Seconds} from "seconds-util";

import ClassUse from "./ClassUse";
import {Heading} from "./Heading";
import VersionList from "./VersionList";
import JavadocTable from "./JavadocTable";
import SupportedVersions from "./SupportedVersions";

export default async function Page(props: {params: Promise<{heading: string, version: string, path: string[]}>}) {
    const {heading, version, path} = await props.params;

    const hash = Heading.toHash(heading);
    const fullPath = path.join("/");

    if (!SupportedVersions.includes(version)) return (<VersionList heading={heading} version={version} fullPath={fullPath} hash={hash} />);
    const isLatest = version == SupportedVersions[0];
    cacheLife(isLatest ? "days" : "max");
    const fetchLife = (isLatest ? Seconds.d() : Seconds.months()).s();

    const url = `https://jd.papermc.io/paper/${version}/${fullPath}${hash}`;
    const response = await fetch(url, {next: {revalidate: fetchLife}});
    if (response.status != 200) return (<div className="text-danger display-3">Invalid Javadoc URL</div>);

    const body = await response.text();
    const $ = cheerio.load(body);

    const enumSummary = $("#enum-constant-summary > div.summary-table").first();
    const fieldSummary = $("#field-summary > div.summary-table").first();

    switch (true) {
        case enumSummary.length != 0: return (<JavadocTable $={$} summary={enumSummary} />);
        case fieldSummary.length != 0: return (<JavadocTable $={$} summary={fieldSummary} />);
        case path[path.length - 2] === "class-use": return (<ClassUse body={body} url={url} hash={hash} />);
        case true: redirect(url);
    }
}
