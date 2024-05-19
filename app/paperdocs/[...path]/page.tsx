import React from "react";

import {Metadata} from "next";
import Versions from "./Versions";

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

export default function Page({params: {path}}: {params: {path: string[]}}) {
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div>
                <h1 className="text-decoration-none text-primary">Minecraft Version:</h1>
                <hr/>
                <div className="text-center list-group">
                    <Versions path={path.join("/")} />
                </div>
            </div>
        </div>
    );
}
