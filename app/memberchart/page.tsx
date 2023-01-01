import ChartRenderer from "./ChartRenderer";

import {Keyv} from "../../handles/Keyv";

export default async function MemberChart() {
    const memberCount = await Keyv.get("memberTraffic") || {};

    const chartData: any = {};
    for (const [date, servers] of Object.entries(memberCount)) {
        // @ts-ignore
        for (const [server, count] of Object.entries(servers)) {
            chartData[server] ??= [];
            chartData[server].push({category: date, count});
        }
    }

    return (
        <div className={"container lh-lg py-sm-5 text-center"}>
            <h1>Weekly Member Traffic Chart</h1>
            <p>You can toggle which servers are displayed on the chart by clicking on the legend.</p>
            <ChartRenderer chartData={chartData} />
        </div>
    );
}
