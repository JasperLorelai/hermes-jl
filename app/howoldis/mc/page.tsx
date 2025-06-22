"use cache";

import Link from "next/link";
import {Metadata, Viewport} from "next";
import {cacheLife} from "next/dist/server/use-cache/cache-life";

import * as MCVersionHandle from "@/handles/MCVersionHandle";

const title = "How old is MC?";
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

export async function generateStaticParams() {
    return (await MCVersionHandle.getTypes()).map(versionType => ({versionType}));
}

export default async function Page() {
    cacheLife("hours");
    return (
        <div className="container py-5 vh-100 text-center">
            <h1>How old is Minecraft?</h1>
            <div className="list-group col-5 mx-auto d-grid py-3">
                {(await MCVersionHandle.getTypes()).map(type =>
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
