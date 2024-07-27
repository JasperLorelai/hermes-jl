import {Metadata} from "next";
import React from "react";

const title = "PaperMC JavaDoc Version Picker";
export const metadata: Metadata = {
    title,
    themeColor: "#ff6600",
    twitter: {card: "summary"},
    openGraph: {
        title,
        siteName: title,
        description: "Lets you pick for which MC version you want PaperMC JavaDocs for.",
    }
};

export default function Layout({children}: {children: React.ReactNode}) {
    return children;
}
