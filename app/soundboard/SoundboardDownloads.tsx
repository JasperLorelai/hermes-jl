import {ReactElement} from "react";

import {unified} from "unified";

import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import addClasses from "rehype-add-classes";
import rehypeStringify from "rehype-stringify";

import Versions from "./Versions";
import {PrimaryBadge} from "./Badge";

interface Asset {
    download_count: number,
    browser_download_url: string
}

interface ReleaseData {
    download_count: number,
    assets: Asset[],
    tag_name: string,
    name: string,
    body: string
}

export const cacheTime = 3600; // 1h

export default async function SoundboardDownloads() {
    const releases: ReleaseData[] = await fetch("https://api.github.com/repos/JasperLorelai/minecraft-soundboard/releases", {next: {revalidate: cacheTime}}).then(y => y.json());
    if (!releases?.length) return (
        <>
            <h2 className="text-primary">Downloads:</h2>
            <div className="text-danger">Could not fetch download data. Please visit the Project Repository instead.</div>
        </>
    );

    const versions: ReactElement[] = [];
    const panels: ReactElement[] = [];
    let totalDownloads = 0;

    for (let i = 0; i < releases.length; i++){
        const {tag_name, assets, name, body} = releases[i];
        const firstAsset = assets.at(0);
        const downloads = firstAsset?.download_count || 0;
        totalDownloads += downloads;

        versions.push(<option value={tag_name} key={tag_name}>{tag_name}</option>);
        panels.push(
            <div className={"tab-pane fade min-vh-100" + (i === 0 ? " show active" : "")} id={tag_name} key={tag_name} role="tabpanel">
                <div className="card text-light" style={{backgroundColor: "var(--bs-gray-700)"}}>
                    <h5 className="card-header" style={{backgroundColor: "var(--bs-gray-800)"}}>
                        <PrimaryBadge text={tag_name} /> {name}
                    </h5>
                    <div className="card-body">
                        <p className="card-text" dangerouslySetInnerHTML={{
                            __html: unified()
                                .use(remarkParse)
                                .use(remarkRehype)
                                .use(addClasses, {img: "img-fluid"})
                                .use(rehypeStringify)
                                .processSync(body)
                                .toString()
                        }} />
                        <a href={firstAsset?.browser_download_url} target="_blank" rel="noreferrer" className="btn btn-primary">Download ({downloads})</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <h2 className="text-primary">Downloads <i>({totalDownloads} total):</i></h2>
            <hr/>
            <Versions versions={versions} />
            <div className="tab-content">{panels}</div>
        </>
    );
}
