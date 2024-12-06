import {Metadata, Viewport} from "next";

import ChartRenderer from "./ChartRenderer";

import {Keyv} from "../../handles/Keyv";

const title = "Member Traffic Chart";
export const metadata: Metadata = {
    title,
    twitter: {card: "summary"},
    openGraph: {
        title,
        siteName: title,
        description: "A traffic chart generator for Discord servers.",
        images: "https://files.jasperlorelai.eu/projects/images/memberchart.png",
    }
};

export const viewport: Viewport = {themeColor: "#67727a"};

export default async function MemberChart() {
    const chartData: any = {};
    for (const [date, servers] of Object.entries(await Keyv.get("memberTraffic") || {})) {
        // @ts-ignore
        for (const [server, count] of Object.entries(servers)) {
            chartData[server] ??= [];
            chartData[server].push({category: date, count});
        }
    }

    return (
        <div className="container lh-lg py-sm-5 text-center">
            <h1>Weekly Member Traffic Chart</h1>
            <p>You can toggle which servers are displayed on the chart by clicking on the legend.</p>
            <ChartRenderer chartData={chartData} />
        </div>
    );
}
