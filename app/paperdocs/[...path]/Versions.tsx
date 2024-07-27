"use client";

import React, {useEffect, useState} from "react";

const versions = [
    "1.21",
    "1.20.6",
    "1.20.5",
    "1.20.4",
    "1.19",
    "1.18"
];

export default function Versions({path}: {path: string}) {
    const [hash, setHash] = useState("");

    useEffect(() => {
        const save = () => setHash(window.location.hash);
        save();

        window.addEventListener("hashchange", save);
        return () => window.removeEventListener("hashchange", save);
    }, [path]);

    return <>{versions.map(mcVer =>
        <a key={mcVer} className="list-group-item list-group-item-action text-info"
           href={`https://jd.papermc.io/paper/${mcVer}/${path}${hash}`}>
            {mcVer}
        </a>
    )}</>;
}
