import React from "react";
import Link from "next/link";
import {Metadata} from "next";

import fs from "fs";

import {Seconds, TimeTypes} from "seconds-util";

import {ParamsVersion} from "./MCVersionParams";
import {generateMetadata as generateOldMetadata} from "../page";

const versionDataPath = "./public/mcVersionData.json";

function getAge(versionType: string, version: string) {
    if (!fs.existsSync(versionDataPath)) return "";
    const allVersionRawData = fs.readFileSync(versionDataPath).toString();
    const allVersionData = JSON.parse(allVersionRawData) || {};
    const versionData = allVersionData[versionType];
    if (!versionData) return "";
    const releaseTime = versionData.find((data: any) => data.id === version)?.releaseTime;
    if (!releaseTime) return "";
    let millisSince = Date.now() - new Date(releaseTime).getTime();
    return Seconds.from(TimeTypes.MILLISECOND, millisSince).toDuration();
}

export function generateMetadata(params: ParamsVersion): Metadata {
    const oldMetadata = Object.assign({}, generateOldMetadata(params));
    if (!oldMetadata) return {};
    const {params: {versionType, version}} = params;
    const title = `How old is MC ${version}?`;
    oldMetadata.title = title;
    if (oldMetadata.openGraph) {
        oldMetadata.openGraph.title = title;
        oldMetadata.openGraph.url = `/howoldis/mc/${versionType}/${version}`;
        oldMetadata.openGraph.description = getAge(versionType, version);
    }
    return oldMetadata;
}

export default function Page({params: {versionType, version}}: ParamsVersion) {
    const age = getAge(versionType, version);
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
            {age ?
                <div className="display-6">
                    Version: <span className="text-primary">{version}</span><br/>
                    Age: <span className="text-primary">{age}</span>
                </div>
                :
                <h2 className="text-danger">This version type does not exist.</h2>
            }
        </div>
    );
}
