import {Metadata} from "next";
import React from "react";

const title = "PaperMC Versioned Javadoc";
export const metadata: Metadata = {
    title,
    twitter: {card: "summary"},
    openGraph: {
        title,
        siteName: title,
        description: "Version selector for PaperMC Javadocs.",
        images: "https://files.jasperlorelai.eu/projects/images/papermc.png"
    }
};

export default async function Layout({children}: {children: React.ReactNode}) {
    return children;
}
