import {Metadata} from "next";
import {redirect} from "next/navigation";

const title = "Discord support server";
export const metadata: Metadata = {
    title,
    themeColor: "#007bff",
    twitter: {card: "summary"},
    openGraph: {
        title,
        siteName: title,
        description: "A Discord support server for my projects. ❤",
        images: "https://files.jasperlorelai.eu/random/images/discord_icon.png"
    }
};

export default function Page() {
    redirect("https://discord.gg/k3emNfeaRy");
}
