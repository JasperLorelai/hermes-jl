import Link from "next/link";
import {Metadata} from "next";

import fs from "fs";

const title = "How old is MC?";
const versionDataPath = "./public/mcVersionData.json";

export const metadata: Metadata = {
    title,
    themeColor: "#0296ff",
    openGraph: {
        title,
        siteName: title,
        url: "/howoldis/mc/",
        description: "View the age of a specific Minecraft version."
    }
}

export default function Page() {
    let versionData;
    if (fs.existsSync(versionDataPath)) {
        const versionRawData = fs.readFileSync(versionDataPath).toString();
        versionData = JSON.parse(versionRawData);
    }
    const versionTypes = Object.keys(versionData || {}).map(type =>
        <Link key={type} className="list-group-item list-group-item-action"  href={`/howoldis/mc/${type}`}>
            {type.split("_")
                .map(w => w.charAt(0).toUpperCase() + w.substring(1).toLowerCase())
                .join(" ")}
        </Link>
    );
    return (
        <div className="container py-5 vh-100 text-center">
            <h1>How old is Minecraft?</h1>
            <div className="list-group col-5 mx-auto d-grid py-3">
                {versionTypes}
            </div>
        </div>
    );
}
