"use client";

import React, {useContext, useEffect, useState} from "react";

import {Documentation} from "../Documentation";
import {ParamsMinecraftVersion} from "../Params";
import DocumentationContext from "../DocumentationContext";

const baseURL = "https://jasperlorelai.eu/antigone";
function resolveMarkdownLinks(string: string) {
    const linkPattern = /\[(\w+ ?)+]\(([^)]+)\)/;
    while (linkPattern.test(string)) {
        const match = string.match(linkPattern);
        if (!match) continue;
        let url = match[2];
        if (url.startsWith(baseURL) && url.length > baseURL.length) url = url.substring(baseURL.length);
        string = string.replace(match[0], `<a target="_blank" href="${url}">${match[1]}</a>`);
    }
    return string;
}

type SearchResult = {
    goalList: React.JSX.Element,
    goalDocs: React.JSX.Element
}

function search(documentation: Documentation | undefined, selected: string | null, term: string): SearchResult {
    if (!documentation) return {
        goalList: (<></>),
        goalDocs: (<></>),
    };
    const isEmpty = !term;
    if (term) term = term.replaceAll(" ", "_");
    const goalEntries = Object.entries(documentation.goals).filter(([key]) =>
        isEmpty ||
        key.startsWith(term) ||
        key.substring("antigone_".length).startsWith(term) ||
        key.includes(term)
    );
    return {
        goalList: (<>{goalEntries.map(([key], i) => {
            const isSelected = selected && isEmpty ? selected === key : i == 0;
            return (<a key={key} href={`#${key}`} className="text-decoration-none">
                <button
                    className={"list-group-item list-group-item-action small goal-pill " + (isSelected ? "active text-white" : "text-primary")}
                    id={`pill-${key}-tab`} data-bs-toggle="pill" data-bs-target={`#${key}`} type="button" role="tab" onChange={() => {}}>
                    {key}
                </button>
            </a>);
        })}</>),
        goalDocs: (<>{goalEntries.map(([goalKey, goalData], i) => {
            const hasDefaults = goalData.parameters.find(param => param.default);
            const isSelected = selected && isEmpty ? selected === goalKey : i == 0;
            return (<div key={goalKey} id={`${goalKey}`} style={{height: "85vh"}} role="tabpanel"
                         className={"tab-pane fade overflow-y-auto cm-scroller px-3" + (isSelected ? " show active" : "")}>
                <a href={`#${goalKey}`} className="text-decoration-none h4 text-info">
                    <i className="bi bi-hash"></i>
                    <span className="text-primary">{goalKey}</span>:
                </a>
                <ul>
                    <li><b>Valid target:</b> <code
                        dangerouslySetInnerHTML={{__html: resolveMarkdownLinks(goalData.target)}}></code>
                    </li>
                    {goalData.extends ?
                        <li>
                            <b>Extends goal: </b>
                            <a href={`#${goalData.extends}`} target="_blank"
                               className="text-decoration-none text-primary">{goalData.extends}</a>
                        </li> :
                        <></>
                    }
                    {goalData.parameters.length ? <li><b>Configuration:</b></li> : <></>}
                </ul>
                {goalData.parameters.length ? <>
                    <div className="card rounded-4 overflow-hidden my-3">
                        <table
                            className="table table-hover table-striped table-bordered text-center w-auto my-0">
                            <thead>
                            <tr>
                                <th scope="col"><b>Option</b></th>
                                <th scope="col"><b>Type</b></th>
                                {hasDefaults ? <th scope="col"><b>Default</b></th> : <></>}
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {goalData.parameters.map(parameter => <>
                                <tr key={parameter.name}>
                                    <td><code className="small">{parameter.name}</code></td>
                                    <td dangerouslySetInnerHTML={{__html: resolveMarkdownLinks(parameter.type)}}></td>
                                    {hasDefaults ?
                                        <td><code dangerouslySetInnerHTML={{__html: parameter.default?.replace("\n", "<br/>") || ""}}></code></td> : <></>}
                                </tr>
                            </>)}
                            </tbody>
                        </table>
                    </div>
                </> : <></>}
                <div className="card rounded-4 overflow-hidden my-3 p-3">
                    {<pre className="text-muted" style={{fontFamily: "inherit"}} onClick={event => {
                        const range = document.createRange();
                        range.selectNodeContents(event.currentTarget);
                        const selection = window.getSelection();
                        if (!selection) return;
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }}>{
                        `spell:\n` +
                        `    spell-class: ".targeted.MobGoalEditSpell"\n` +
                        `    always-granted: true\n` +
                        `    cast-item: stick\n` +
                        `    add:\n` +
                        `        - goal: ${goalKey}\n` +
                        `          priority: 1\n` + (goalData.parameters.length ?
                            `          data:\n` +
                            goalData.parameters.map(parameter =>
                                `              ${parameter.name}: ${parameter.default || ""}`
                            ).join("\n") : "")
                    }</pre>}
                </div>
            </div>);
        })}</>)
    };
}

export default function Page({params: {mcVersion}}: ParamsMinecraftVersion) {
    const documentation = useContext(DocumentationContext)?.[mcVersion];

    const hash = window.location.hash.substring(1);
    const selected = documentation?.goals.hasOwnProperty(hash) ? hash : null;
    const shouldShowLivingEntityClass = hash === "LivingEntityClass";
    const [found, setFound] = useState(search(documentation, selected, ""));

    useEffect(() => {
        // Make custom pills toggle visible text colors when active or not.
        for (let pill of [...document.getElementsByClassName("goal-pill")]) {
            function swapper() {
                const isActive = pill.classList.contains("active");
                pill.classList.replace(
                    isActive ? "text-white" : "text-primary",
                    isActive ? "text-primary" : "text-white"
                );
            }
            pill.addEventListener("hide.bs.tab", swapper);
            pill.addEventListener("show.bs.tab", swapper);
        }

        // Toggle eye icon to be filled or emptied depending on if the enum list is visible.
        const valuesElement = document.getElementById("LivingEntityClass-values");
        const valuesEye = document.getElementById("LivingEntityClass-eye");
        if (!valuesElement || !valuesEye) return;
        valuesElement.addEventListener("hide.bs.collapse", _ => {
            valuesEye.classList.replace("bi-eye-fill", "bi-eye");
        });
        valuesElement.addEventListener("show.bs.collapse", _ => {
            valuesEye.classList.replace("bi-eye", "bi-eye-fill");
        });
    }, [found]);

    if (!documentation) return (<div className="text-danger">Could not load version data.</div>);

    return (<>
        <a id="LivingEntityClass" href="#LivingEntityClass" className="text-decoration-none text-info h2">
            <i className="bi bi-hash"></i><span className="text-primary">LivingEntityClass</span> values:
        </a>
        <hr/>
        <div className="my-3">
            <button className="btn btn-primary w-25 my-2" type="button"
                    data-bs-toggle="collapse" data-bs-target="#LivingEntityClass-values">
                Values <i className="bi bi-eye" id="LivingEntityClass-eye"></i>
            </button>
            <ul className={"list-group w-25" + (shouldShowLivingEntityClass ? "" : " collapse")} id="LivingEntityClass-values">
                {documentation.LivingEntityClass.map(value => (<>
                    <li className="list-group-item list-group-item-action" key={value}><code>{value}</code></li>
                </>))}
            </ul>
        </div>
        <a id="goals" href="#goals" className="text-decoration-none text-info h2">
            <i className="bi bi-hash"></i>Goals:
        </a>
        <hr/>
        <div className="row">
            <div className="list-group col-4 text-break overflow-y-auto cm-scroller" style={{height: "85vh"}} role="tablist" tabIndex={0}>
                <form role="search" className="py-3">
                    <input className="form-control" type="search" placeholder="Search" onChange={event => {
                        setFound(search(documentation, selected, event.currentTarget.value));
                    }}
                           onKeyDown={event => {
                        if (event.key !== "Enter") return;
                        setFound(search(documentation, selected, event.currentTarget.value));
                    }}/>
                </form>
                {found.goalList}
            </div>
            <div className="tab-content col-8 px-1">{found.goalDocs}</div>
        </div>
        <hr/>
    </>);
}
