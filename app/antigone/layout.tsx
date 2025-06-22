"use cache";

import {cacheLife} from "next/dist/server/use-cache/cache-life";
import React from "react";
import {Metadata, Viewport} from "next";

import Navbar from "@/components/Navbar";

const title = "Documentation - Antigone";
export const metadata: Metadata = {
    title,
    twitter: {card: "summary"},
    openGraph: {
        title,
        siteName: title,
        description: "View documentation for the Antigone, a MagicSpells addon.",
        images: "https://files.jasperlorelai.eu/projects/images/antigone.png"
    }
};

export const viewport: Viewport = {themeColor: "#0296ff"};

export default async function Layout({children}: {children: React.ReactNode}) {
    cacheLife("hours");

    return (<>
        <Navbar brand={{text: "Antigone", url: "/antigone"}} links={[
            {text: "Project Repository", url: "https://github.com/JasperLorelai/Antigone", target: "_blank"},
            {text: "MagicSpells Repository", url: "https://github.com/TheComputerGeek2/MagicSpells", target: "_blank"},
            {text: "Download", url: "https://github.com/JasperLorelai/Antigone/releases", target: "_blank"}
        ]} />

        <div className="container lh-lg pt-sm-5">
            <h1 className="text-primary">Introduction:</h1>
            <hr/>
            <p className="py-3">
                Antigone is a <a href="https://github.com/TheComputerGeek2/MagicSpells/"
                                 target="_blank">MagicSpells</a> plugin
                addon intended to provide Vanilla Mob Goals into <a
                href="https://github.com/TheComputerGeek2/MagicSpells/wiki/MobGoalEditSpell"
                target="_blank">MagicSpells&apos; Mob Goal Edit Spell</a>. All values
                support <a href="https://github.com/TheComputerGeek2/MagicSpells/wiki/Expression" target="_blank">expressions</a> except for
                Modifier lists.
            </p>

            {children}
        </div>
    </>);
}
