import {Metadata} from "next";

import SpellAnalyser from "./SpellAnalyser";

const title = "Spell Analyser;"
export const metadata: Metadata = {
    title,
    themeColor: "#05f721",
    openGraph: {
        title,
        siteName: title,
        description: "This tool was developed to analyse your MagicSpells YAML config, diagnose it, report issues, send tips on how to fix them, and it will even fix some of them for you automatically - all for free!",
        images: "https://media.discordapp.net/attachments/1079904377571131433/1079904924801957978/image.png"
    }
};

export default function Page() {
    return (<SpellAnalyser />);
}
