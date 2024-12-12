"use cache";

import React from "react";
import {redirect} from "next/navigation";
import {cacheLife} from "next/dist/server/use-cache/cache-life";

import * as cheerio from "cheerio";

import Table from "./Table";
import ClassUse from "./ClassUse";
import VersionList from "./VersionList";
import SupportedVersions from "./SupportedVersions";

export default async function Page(props: {params: Promise<{version: string, path: string[]}>}) {
    const {version, path} = await props.params;
    const fullPath = path.join("/");

    if (!SupportedVersions.includes(version)) return (<VersionList version={version} fullPath={fullPath} />);
    cacheLife(version == SupportedVersions[0] ? "hours" : "max");

    const url = `https://jd.papermc.io/paper/${version}/${fullPath}`;
    const response = await fetch(url);
    if (response.status != 200) return (<div className="text-danger display-3">Invalid Javadoc URL</div>);

    const body = await response.text();
    const $ = cheerio.load(body);

    const enumSummary = $("#enum-constant-summary > div.summary-table").first();
    const fieldSummary = $("#field-summary > div.summary-table").first();

    switch (true) {
        case enumSummary.length != 0: return (<Table $={$} summary={enumSummary} />);
        case fieldSummary.length != 0: return (<Table $={$} summary={fieldSummary} />);
        case path[path.length - 2] === "class-use": return (<ClassUse body={body} url={url} />);
        case true: redirect(url);
    }
}
