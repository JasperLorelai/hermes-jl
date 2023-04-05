import React from "react";
import Link from "next/link";
import {Metadata} from "next";

import {ParamsVersion} from "./MCVersionParams";

import {Seconds, TimeTypes} from "seconds-util";

function getAge(versionType: string, version: string) {
    const allVersionData = require("public/mcVersionData.json") || {};
    const versionData = allVersionData[versionType];
    if (!versionData) return "";
    const releaseTime = versionData.find((data: any) => data.id === version)?.releaseTime;
    if (!releaseTime) return "";
    let millisSince = Date.now() - new Date(releaseTime).getTime();
    return Seconds.from(TimeTypes.MILLISECOND, millisSince).toDuration();
}

export function generateMetadata({params: {versionType, version}}: ParamsVersion): Metadata {
    const title = `How old is MC ${version}?`;
    return {
        title,
        themeColor: "#0296ff",
        openGraph: {
            title,
            siteName: "How old is MC?",
            url: `/howoldis/mc/${versionType}/${version}`,
            description: "Age: " + getAge(versionType, version)
        }
    };
}

export default function Page({params: {versionType, version}}: ParamsVersion) {
    const age = getAge(versionType, version);
    return (
        <div className="container py-5 vh-100">
            <div className="text-center">
                <h1>How old is Minecraft?</h1>
                <div className="row-cols-4 py-2">
                    <Link className="btn btn-primary" type="button" href={`/howoldis/mc/${versionType}`}>
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
