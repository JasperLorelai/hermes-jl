import {Metadata} from "next";
import React, {Suspense} from "react";

import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";

import {Heading} from "./Heading";
import ProxyLinker from "../../../ProxyLinker";
import HeadingRedirect from "./HeadingRedirect";
import SupportedVersions from "./SupportedVersions";

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

export default async function Layout({children, params}: {children: React.ReactNode, params: Promise<{heading: string, version: string, path: string[]}>}) {
    const {heading, version, path} = await params;
    const hash = Heading.toHash(heading);
    const fullPath = path.join("/");
    return (
        <div className="vh-100 d-flex flex-column">
            <HeadingRedirect />
            <Navbar brand="Paper JavaDocs" links={
                SupportedVersions.includes(version) ? [
                    {text: "Other Versions", url: `/paperdocs/${heading}/${fullPath}`},
                    {text: "Javadocs", url: `https://jd.papermc.io/paper/${version}/${fullPath}${hash}`}
                ] : []
            }>
                <span>Paste PaperMC/SpigotMC JavaDocs URL:</span>
                <ProxyLinker/>
            </Navbar>

            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                <div>
                    <div className="container lh-lg py-sm-5">
                        <Suspense fallback={<LoadingSpinner/>}>
                            {children}
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
