import React from "react";
import Link from "next/link";
import {Metadata} from "next";

import fs from "fs";

import {Seconds} from "seconds-util";

import {ParamsVersion} from "./MCVersionParams";
import {generateMetadata as generateOldMetadata} from "../page";

const versionDataPath = "./public/mcVersionData.json";

function getAge(releaseDate: Date | null) {
    if (!releaseDate) return "";
    return Seconds.milliseconds(Date.now() - releaseDate.getTime()).toDuration();
}

function getReleaseDate(versionType: string, version: string) {
    if (!fs.existsSync(versionDataPath)) return null;
    const allVersionRawData = fs.readFileSync(versionDataPath).toString();
    const allVersionData = JSON.parse(allVersionRawData) || {};
    const releaseTime = allVersionData[versionType]?.find((data: any) => data.id === version)?.releaseTime || 0;
    return new Date(releaseTime);
}

export async function generateMetadata(paramsAsync: ParamsVersion): Promise<Metadata> {
    const params = await paramsAsync.params;
    const oldMetadata = Object.assign({}, await generateOldMetadata(paramsAsync));
    if (!oldMetadata) return {};
    const {versionType, version} = params;
    const title = `How old is MC ${version}?`;
    oldMetadata.title = title;
    const releaseDate = getReleaseDate(versionType, version);
    if (releaseDate && oldMetadata.openGraph) {
        oldMetadata.openGraph.title = title;
        oldMetadata.openGraph.url = `/howoldis/mc/${versionType}/${version}`;
        oldMetadata.openGraph.description = releaseDate.toUTCString() + " - " + getAge(releaseDate);
    }
    return oldMetadata;
}

export default async function Page(props: ParamsVersion) {
    const {versionType, version} = await props.params;
    const releaseDate = getReleaseDate(versionType, version);
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
            {releaseDate ?
                <div className="display-6">
                    <div>Version: <span className="text-primary">{version}</span></div>
                    <div>Release Time: <a className="text-primary" href={"https://time.is/" + releaseDate.getTime()} target="_blank">
                        {releaseDate.toUTCString()}
                    </a></div>
                    <div>Age: <span className="text-primary">{getAge(releaseDate)}</span></div>
                </div>
                :
                <h2 className="text-danger">This version type does not exist.</h2>
            }
        </div>
    );
}
