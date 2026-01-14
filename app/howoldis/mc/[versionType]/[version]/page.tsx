"use cache";

import React from "react";
import Link from "next/link";
import {Metadata} from "next";
import {cacheLife} from "next/dist/server/use-cache/cache-life";

import {extendMetadata} from "../page";
import {ParamsVersion} from "./MCVersionParams";
import * as MCVersionHandle from "@/handles/MCVersionHandle";

export async function generateMetadata(params: ParamsVersion): Promise<Metadata> {
    let {versionType, version} = await params.params;
    version = await MCVersionHandle.parseVersion(versionType, version);
    const metadata = Object.assign({}, await extendMetadata(versionType));

    const title = `How old is MC ${version}?`;
    metadata.title = title;
    const releaseTime = await MCVersionHandle.getReleaseTime(version);
    if (releaseTime && metadata.openGraph) {
        metadata.openGraph.title = title;
        metadata.openGraph.url = `/howoldis/mc/${versionType}/${version}`;
        metadata.openGraph.description = releaseTime.date.toUTCString() + " - " + releaseTime.age;
    }

    return metadata;
}

export default async function Page(props: ParamsVersion) {
    cacheLife("hours");
    let {versionType, version} = await props.params;
    version = await MCVersionHandle.parseVersion(versionType, version);
    const releaseTime = await MCVersionHandle.getReleaseTime(version);

    return (
        <div className="container py-5 vh-100">
            <div className="text-center">
                <h1>How old is Minecraft?</h1>
                <div className="row-cols-4 py-2">
                    <Link className="btn btn-primary" type="button" href={`/howoldis/mc/${versionType}`} prefetch={true}>
                        <i className="bi bi-arrow-left-short"></i>
                        Back
                    </Link>
                </div>
            </div>
            {releaseTime ?
                <div className="display-6">
                    <div>Version: <span className="text-primary">{version}</span></div>
                    <div>Release Time: <a className="text-primary" href={"https://time.is/" + releaseTime.date.getTime()} target="_blank">
                        {releaseTime.date.toUTCString()}
                    </a></div>
                    <div>Age: <span className="text-primary">{releaseTime.age}</span></div>
                </div>
                :
                <h2 className="text-danger">This version type does not exist.</h2>
            }
        </div>
    );
}
