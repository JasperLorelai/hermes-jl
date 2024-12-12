import React from "react";

import Navbar from "@/components/Navbar";
import ProxyLinker from "../../ProxyLinker";
import SupportedVersions from "./SupportedVersions";

export default async function Layout({children, params}: {children: React.ReactNode, params: Promise<{version: string, path: string[]}>}) {
    const {version, path} = await params;
    const fullPath = path.join("/");
    return (
        <div className="vh-100 d-flex flex-column">
            <Navbar brand="Paper JavaDocs" links={
                SupportedVersions.includes(version) ? [
                    {text: "Other Versions", url: `/paperdocs/${fullPath}`},
                    {text: "Javadocs", url: `https://jd.papermc.io/paper/${version}/${fullPath}`}
                ] : []
            }>
                <span>Paste PaperMC/SpigotMC JavaDocs URL:</span>
                <ProxyLinker/>
            </Navbar>

            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                <div>
                    <div className="container lh-lg py-sm-5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
