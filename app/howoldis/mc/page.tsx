import Link from "next/link";
import {cookies} from "next/headers";
import {Metadata, Viewport} from "next";

import fs from "fs";

const title = "How old is MC?";
const versionDataPath = "./public/mcVersionData.json";

export const metadata: Metadata = {
    title,
    twitter: {card: "summary"},
    openGraph: {
        title,
        siteName: title,
        description: "View the age of a specific Minecraft version."
    }
};

export const viewport: Viewport = {themeColor: "#0296ff"};

export default async function Page() {
    await cookies(); // opt out of cache

    let versionData = {};
    if (fs.existsSync(versionDataPath)) {
        const versionRawData = fs.readFileSync(versionDataPath).toString();
        versionData = JSON.parse(versionRawData);
    }
    const versionTypes = Object.keys(versionData);

    return (
        <div className="container py-5 vh-100 text-center">
            <h1>How old is Minecraft?</h1>
            <div className="list-group col-5 mx-auto d-grid py-3">
                {versionTypes.map(type =>
                    <Link key={type} className="list-group-item list-group-item-action" href={`/howoldis/mc/${type}`} prefetch={true}>
                        {type.split("_")
                            .map(w => w.charAt(0).toUpperCase() + w.substring(1).toLowerCase())
                            .join(" ")}
                    </Link>
                )}
            </div>
        </div>
    );
}
