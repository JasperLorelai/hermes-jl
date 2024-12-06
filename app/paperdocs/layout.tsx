import React from "react";
import {Metadata, Viewport} from "next";

const title = "PaperMC JavaDoc Version Picker";
export const metadata: Metadata = {
    title,
    twitter: {card: "summary"},
    openGraph: {
        title,
        siteName: title,
        description: "Lets you pick for which MC version you want PaperMC JavaDocs for.",
    }
};

export const viewport: Viewport = {themeColor: "#ff6600"};

export default function Layout({children}: {children: React.ReactNode}) {
    return children;
}
