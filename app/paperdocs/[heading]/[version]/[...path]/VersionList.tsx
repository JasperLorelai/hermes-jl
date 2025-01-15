"use client";

import Link from "next/link";
import React, {useEffect, useState} from "react";

import Cookie from "@/handles/cookie";

import SupportedVersions from "./SupportedVersions";

export default function VersionList({heading, version, fullPath, hash}: {heading: string, version: string, fullPath: string, hash: string}) {
    const [compact, setCompact] = useState(true);

    useEffect(() => {
        setCompact(Cookie.from(document).get("compact") !== "false");
    }, []);

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.id === "compact-on";
        Cookie.from(document).set("compact", value + "");
        setCompact(value);
    }

    return (
        <>
            <h1 className="text-decoration-none text-primary">Minecraft Version:</h1>
            <hr/>

            <div className="d-flex flex-row gap-2 pb-3">
                <div>Compact Docs:</div>
                <div className="btn-group rounded bg-body-secondary" role="group">
                    <input type="radio" className="btn-check" id="compact-on" name="preference" value="On"
                           checked={compact} onChange={onChange} />
                    <label className="btn btn-outline-success" htmlFor="compact-on">On</label>

                    <input type="radio" className="btn-check" id="compact-off" name="preference" value="Off"
                           checked={!compact} onChange={onChange} />
                    <label className="btn btn-outline-secondary" htmlFor="compact-off">Off</label>
                </div>
            </div>

            <div className="text-center list-group">
                {SupportedVersions.map(mcVer =>
                    <Link key={mcVer} className="list-group-item list-group-item-action text-info" href={compact ?
                        `/paperdocs/${heading}/${mcVer}/${version}/${fullPath}` :
                        `https://jd.papermc.io/paper/${mcVer}/${version}/${fullPath}${hash}`
                    }>{mcVer}</Link>
                )}
            </div>
        </>
    );
}
