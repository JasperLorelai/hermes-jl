"use client";

import {ReactElement, useEffect, useState} from "react";

import {unified} from "unified";

import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import addClasses from "rehype-add-classes";
import rehypeStringify from "rehype-stringify";

import {PrimaryBadge} from "./Badge";
import LoadingSpinner from "../../components/LoadingSpinner";

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

export default function SoundboardDownloads() {
    const [data, setData] = useState(<></>);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.github.com/repos/JasperLorelai/minecraft-soundboard/releases")
            .then(y => y.json())
            .then((releases: any) => {
                const versionOptions: ReactElement[] = [];
                const panels: ReactElement[] = [];
                let totalDownloads = 0;
                releases.forEach((data: ReleaseData, i: number) => {
                    const tag = data.tag_name;
                    const firstAsset = data.assets.at(0);
                    const downloads = firstAsset?.download_count || 0;
                    totalDownloads += downloads;
                    versionOptions.push(<option value={tag} key={tag}>{tag}</option>);
                    panels.push(
                        <div className={"tab-pane fade min-vh-100" + (i === 0 ? " show active" : "")} id={tag} key={tag} role="tabpanel">
                            <div className="card text-light" style={{backgroundColor: "var(--bs-gray-700)"}}>
                                <h5 className="card-header" style={{backgroundColor: "var(--bs-gray-800)"}}>
                                    <PrimaryBadge text={tag} /> {data.name}
                                </h5>
                                <div className="card-body">
                                    <p className="card-text" dangerouslySetInnerHTML={{
                                        __html: unified()
                                            .use(remarkParse)
                                            .use(remarkRehype)
                                            .use(addClasses, {
                                                img: "img-fluid",
                                                code: "p-1 bg-secondary"
                                            })
                                            .use(rehypeStringify)
                                            .processSync(data.body)
                                            .toString()
                                    }} />
                                    <a href={firstAsset?.browser_download_url} target="_blank" rel="noreferrer" className="btn btn-primary">Download ({downloads})</a>
                                </div>
                            </div>
                        </div>
                    );
                });

                setData(
                    <>
                        <h1>Downloads <i>({totalDownloads}):</i></h1>
                        <hr/>
                        <select className="form-select form-select-lg mb-3 text-center w-25" defaultValue={0}
                                onChange={e => {
                                    const el = document.getElementById(e.target.value);
                                    if (!el) return;
                                    const panes = document.getElementsByClassName("tab-pane");
                                    for (const pane of panes) {
                                        if (el === pane) pane.classList.add("show", "active");
                                        else pane.classList.remove("show", "active");
                                    }
                                }}>{versionOptions}</select>
                        <div className="tab-content">{panels}</div>
                    </>
                );
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
                setData(
                    <>
                        <h1>Downloads:</h1>
                        <p>Could not fetch download data. Please visit the Project Repository instead.</p>
                    </>
                );
                setLoading(false);
            });
    }, []);

    if (isLoading) return (<LoadingSpinner/>);
    return data;
}