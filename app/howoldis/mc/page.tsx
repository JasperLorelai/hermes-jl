import Link from "next/link";
import {Metadata} from "next";

const title = "How old is MC?";
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
    const versionData = require("public/mcVersionData.json") || {};
    const versionTypes = Object.keys(versionData).map(type =>
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
