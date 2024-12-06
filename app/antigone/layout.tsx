import React from "react";
import {Metadata, Viewport} from "next";
import Navbar from "../../components/Navbar";

const title = "Documentation - Antigone";
export const metadata: Metadata = {
    title,
    twitter: {card: "summary"},
    openGraph: {
        title,
        siteName: title,
        url: "/docs/antigone/",
        description: "View documentation for the Antigone, a MagicSpells addon.",
        images: "https://files.jasperlorelai.eu/projects/images/antigone.png"
    }
};

export const viewport: Viewport = {themeColor: "#0296ff"};

export default function Layout({children}: {children: React.ReactNode}) {
    return (<>
        <Navbar brand={{text: "Antigone", url: "/antigone"}} items={[
            {key: "repository", text: "Project Repository", url: "https://github.com/JasperLorelai/Antigone", target: "_blank"},
            {key: "ms_repository", text: "MagicSpells Repository", url: "https://github.com/TheComputerGeek2/MagicSpells", target: "_blank"},
            {key: "download", text: "Download", url: "https://github.com/JasperLorelai/Antigone/releases", target: "_blank"}
        ]} />

        <div className="container lh-lg pt-sm-5">
            <h1 className="text-primary">Introduction:</h1>
            <hr/>
            <p className="py-3">
                Antigone is a <a href="https://github.com/TheComputerGeek2/MagicSpells/"
                                 target="_blank">MagicSpells</a> plugin
                addon intended to provide Vanilla Mob Goals into <a
                href="https://github.com/TheComputerGeek2/MagicSpells/wiki/Mob-Goal-Edit-Spell"
                target="_blank">MagicSpells&apos; Mob Goal Edit Spell</a>. Note all values are required unless they have
                a default value. All values
                support <a href="https://github.com/TheComputerGeek2/MagicSpells/wiki/Expression"
                           target="_blank">expressions</a> except for
                Modifier lists.
            </p>

            {children}
        </div>
    </>);
}
