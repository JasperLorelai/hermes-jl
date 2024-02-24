import {Metadata} from "next";
import {redirect} from "next/navigation";

const title = "Discord support server";
export const metadata: Metadata = {
    title,
    themeColor: "#007bff",
    openGraph: {
        title,
        siteName: title,
        description: "A Discord support server for my projects. ❤",
        images: "https://jasperlorelai.eu/discord-icon.png"
    }
};

export default function Page() {
    redirect("https://discord.gg/k3emNfeaRy");
}
