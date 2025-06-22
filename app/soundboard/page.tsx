"use cache";

import {Metadata, Viewport} from "next";
import {cacheLife} from "next/dist/server/use-cache/cache-life";

import Navbar from "@/components/Navbar";
import AnimatedWebP from "@/components/AnimatedWebP";
import {PrimaryBadge, SecondaryBadge} from "./Badge";
import SoundboardDownloads from "./SoundboardDownloads";

const title = "Minecraft Soundboard";
export const metadata: Metadata = {
    title,
    twitter: {card: "summary"},
    openGraph: {
        title,
        siteName: title,
        description: "A minecraft soundboard. Made with ❤ using the MagicSpells plugin.",
        images: "https://files.jasperlorelai.eu/projects/images/soundboard.png"
    }
};

export const viewport: Viewport = {themeColor: "#ff7a21"};

export default async function Page() {
    cacheLife("hours");

    return (
        <>
            <Navbar brand={{text: "Soundboard", url: "/soundboard"}} links={[
                {text: "Project Repository", url: "https://github.com/JasperLorelai/minecraft-soundboard", target: "_blank"},
                {text: "MagicSpells Repository", url: "https://github.com/TheComputerGeek2/MagicSpells", target: "_blank"},
                {text: "EffectLib Plugin", url: "https://dev.bukkit.org/projects/effectlib", target: "_blank"},
            ]} />

            <div className="container lh-lg py-sm-5">
                <div className="d-flex justify-content-center">
                    <div className="text-primary-emphasis fs-1 fw-bold">Minecraft Soundboard</div>
                </div>
                <h2 className="text-primary">How to set up:</h2>
                <hr/>
                <p>
                    This is a configuration file for the <PrimaryBadge text="MagicSpells" /> plugin.
                    Ideally, you should install the latest version of the Soundboard that does not add sounds above your
                    Minecraft version. Install the MagicSpells version that supports that Minecraft version. Take note
                    of the changelogs in case of incompatibilities, fixes, or changes.
                </p>
                <p>
                    Download the config file and place it in <SecondaryBadge text="plugins/MagicSpells" />,
                    then run <PrimaryBadge text="/ms reload" />. Use one of the following commands to open the Soundboard:
                    <PrimaryBadge text="/sb" />, <SecondaryBadge text= "/sounds" /> or <SecondaryBadge text="/soundboard" />.
                </p>
                <AnimatedWebP
                    className="d-flex justify-content-center py-3"
                    src="https://files.jasperlorelai.eu/projects/videos/soundboard_demo.webp"
                    placeholder="https://files.jasperlorelai.eu/projects/images/soundboard_demo_blur.png"
                    alt="Soundboard demo" width={800} height={450}
                />

                <SoundboardDownloads/>
            </div>
        </>
    );
}
