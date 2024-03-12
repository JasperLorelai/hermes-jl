import Link from "next/link";
import {Metadata} from "next";

import fs from "fs";

import {metadata as oldMetadata} from "../page";
import {ParamsVersionType} from "./[version]/MCVersionParams";

const versionDataPath = "./public/mcVersionData.json";

export function generateMetadata({params: {versionType}}: ParamsVersionType): Metadata {
    const old = Object.assign({}, oldMetadata);
    if (old.openGraph) old.openGraph.url = "/howoldis/mc/" + versionType;
    return old;
}

export default function Page({params: {versionType}}: ParamsVersionType) {
    let versionData;
    if (fs.existsSync(versionDataPath)) {
        const allVersionRawData = fs.readFileSync(versionDataPath).toString();
        const allVersionData = JSON.parse(allVersionRawData) || {};
        versionData = allVersionData[versionType];
    }
    return (
        <div className="container py-5 vh-100 text-center">
            <h1>How old is Minecraft?</h1>
            <div className="row-cols-4 py-2">
                <Link className="btn btn-primary" type="button" href={"/howoldis/mc"} prefetch={true}>
                    <i className="bi bi-arrow-left-short"></i>
                    Back
                </Link>
            </div>
            {versionData ?
                <div className="list-group col-5 mx-auto d-grid py-3">
                    {versionData.map((version: {id: string}) => {
                        const {id} = version;
                        return (
                            <Link className="list-group-item list-group-item-action"
                                  href={`/howoldis/mc/${versionType}/${id}`} key={id} prefetch={true}>
                                {id}
                            </Link>
                        );
                    })}
                </div>
                :
                <h2 className="text-danger">This version type does not exist.</h2>
            }
        </div>
    );
}
