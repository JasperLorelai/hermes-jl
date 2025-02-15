import {Metadata, Viewport} from "next";

import Navbar from "@/components/Navbar";
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

export default function Page() {
    return (
        <>
            <Navbar brand={{text: "Soundboard", url: "/soundboard"}} links={[
                {text: "Project Repository", url: "https://github.com/JasperLorelai/minecraft-soundboard", target: "_blank"},
                {text: "MagicSpells Repository", url: "https://github.com/TheComputerGeek2/MagicSpells", target: "_blank"},
                {text: "EffectLib Plugin", url: "https://dev.bukkit.org/projects/effectlib", target: "_blank"},
            ]} />

            <div className="container lh-lg py-sm-5">
                <h1 className="text-primary">How to set up:</h1>
                <hr/>
                <p>
                    This configuration file requires the plugin MagicSpells to run. Note that the <PrimaryBadge
                    text={"1.0.0"}/> version
                    of the Soundboard only includes sounds up to <PrimaryBadge text={"1.12.2"}/>. That Minecraft version
                    is only supported
                    by MagicSpells versions below <PrimaryBadge text={"4.0"}/>, which require EffectLib as well.
                    The <PrimaryBadge text={"1.0.0"}/> version
                    works on Minecraft versions <PrimaryBadge text={"1.8.x-1.12.2"}/>, but you obviously can not
                    play <PrimaryBadge text={"1.12.x"}/> sounds
                    on versions below. Soundboard versions above <PrimaryBadge text={"1.0.0"}/> support
                    MagicSpells <PrimaryBadge text={"4.0+."}/>
                </p>
                <p>
                    Download the configuration file below and place the file in your MagicSpells plugin folder, then
                    reload the plugin.
                    To open use one of following commands: <SecondaryBadge text={"/soundboard"}/>, <SecondaryBadge
                    text={"/sounds"}/> or <SecondaryBadge text={"/sb"}/>.
                </p>
                <p>
                    In the GUI you can search for sounds to check their sound names or select it to play it. You can
                    modify
                    pitch and volume and try what it sounds like with your configuration. Once you think the sound is
                    good enough
                    you can click the paper item to paste the current sound configuration in chat where you can copy it
                    and paste
                    it in your scripting plugin, or anywhere you need to use it.
                </p>

                <SoundboardDownloads/>
            </div>
        </>
    );
}
