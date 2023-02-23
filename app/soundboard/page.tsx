"use client";

import {ReactElement, useEffect, useState} from "react";

import NormalBadge from "./NormalBadge";

import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify"
import addClasses from "rehype-add-classes";
import dynamic from "next/dynamic";

const DynamicCopyBadge = dynamic(
    () => import("./CopyBadge"),
    {ssr: false}
);

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

export default function Page() {
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
                                    <NormalBadge text={tag} /> {data.name}
                                </h5>
                                <div className="card-body">
                                    <p className="card-text" dangerouslySetInnerHTML={{
                                        __html: unified()
                                            .use(remarkParse)
                                            .use(remarkRehype)
                                            .use(addClasses, {
                                                img: "img-fluid",
                                                code: "p-1 text-light bg-secondary"
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
                        <select className="form-select form-select-lg mb-3 text-center w-25 text-bg-dark" defaultValue={0} onChange={e => {
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

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="https://jasperlorelai.eu/soundboard">Soundboard</a>
                    <button className="navbar-toggler collapsed" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="navbar-collapse collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item" key="repository">
                                <a className="nav-link" href="https://github.com/JasperLorelai/minecraft-soundboard">Project Repository</a>
                            </li>
                            <li className="nav-item" key="ms_repository">
                                <a className="nav-link" href="https://github.com/TheComputerGeek2/MagicSpells">MagicSpells Repository</a>
                            </li>
                            <li className="nav-item" key="effectlib">
                                <a className="nav-link" href="https://dev.bukkit.org/projects/effectlib">EffectLib Plugin</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container lh-lg py-sm-5">
                <h1>How to set up:</h1>
                <p>
                    This configuration file requires the plugin MagicSpells to run. Note that the <NormalBadge text={"1.0.0"} /> version
                    of the Soundboard only includes sounds up to <NormalBadge text={"1.12.2"} />. That Minecraft version is only supported
                    by MagicSpells versions below <NormalBadge text={"4.0"} />, which require EffectLib as well. The <NormalBadge text={"1.0.0"} />
                    version works on Minecraft versions <NormalBadge text={"1.8.x-1.12.2"} />, but you obviously can not play <NormalBadge texT={"1.12.x"} />
                    sounds on versions below. Soundboard versions above <NormalBadge text={"1.0.0"} /> support MagicSpells <NormalBadge text={"4.0+."} />
                </p>
                <p>
                    Download the configuration file below and place the file in your MagicSpells plugin folder, then reload the plugin.
                    To open use one of following commands: <DynamicCopyBadge text={"/soundboard"} />, <DynamicCopyBadge text={"/sounds"} /> or <DynamicCopyBadge text={"/sb"} />.
                </p>
                <p>
                    In the GUI you can search for sounds to check their sound names or select it to play it. You can modify
                    pitch and volume and try what it sounds like with your configuration. Once you think the sound is good enough
                    you can click the paper item to paste the current sound configuration in chat where you can copy it and paste
                    it in your scripting plugin, or anywhere you need to use it.
                </p>

                {isLoading ?
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border m-5" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <>{data}</>
                }
            </div>

            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" className="toast align-items-center text-bg-dark" data-bs-delay="1000" role="alert">
                    <div className="d-flex">
                        <div className="toast-body">Text copied.</div>
                        <button type="button" className="btn-close me-2 m-auto btn-close-white" data-bs-dismiss="toast" />
                    </div>
                </div>
            </div>
        </>
    );
}
