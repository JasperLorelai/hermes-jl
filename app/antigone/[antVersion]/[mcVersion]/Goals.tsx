import React, {ReactNode, useEffect, useState} from "react";

import {Light as SyntaxHighlighter} from "react-syntax-highlighter";

import {stackoverflowDark} from "react-syntax-highlighter/dist/esm/styles/hljs";
import yaml from "react-syntax-highlighter/dist/esm/languages/hljs/yaml";

SyntaxHighlighter.registerLanguage("yaml", yaml);

import {Goals} from "../Documentation";

const baseURL = "https://jasperlorelai.eu/antigone";
function resolveMarkdownLinks(string: string) {
    const linkPattern = /\[(\w+(?: \w+)*)]\(([^)]+)\)/;
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
    list: ReactNode,
    docs: ReactNode
}

function search(goals: Goals, selected: string | null, term: string): SearchResult {
    const isEmpty = !term;
    if (term) term = term.replaceAll(" ", "_");
    const goalEntries = Object.entries(goals).filter(([key]) =>
        isEmpty ||
        key.startsWith(term) ||
        key.substring("antigone_".length).startsWith(term) ||
        key.includes(term)
    );

    function line(num: number, code: string) {
        return " ".repeat(num) + code + "\n";
    }

    return {
        list: goalEntries.map(([key], i) =>
            <a key={key} href={`#${key}`} className="text-decoration-none">
                <button className={"list-group-item list-group-item-action small goal-pill " +
                        ((selected && isEmpty ? selected === key : i == 0) ? "active text-white" : "text-primary")}
                        id={`pill-${key}-tab`} data-bs-toggle="pill" data-bs-target={`#${key}`} type="button" role="tab">
                    {key}
                </button>
            </a>
        ),
        docs: goalEntries.map(([goalKey, goalData], i) => {
            const hasDefaults = goalData.parameters.find(param => param.default);
            const isSelected = selected && isEmpty ? selected === goalKey : i == 0;
            return (<div key={goalKey} id={`${goalKey}`} style={{height: "85vh"}} role="tabpanel"
                         className={"tab-pane fade overflow-y-auto cm-scroller px-3" + (isSelected ? " show active" : "")}>
                <a href={`#${goalKey}`} className="text-decoration-none h4 text-info">
                    <i className="bi bi-hash"></i>
                    <span className="text-primary">{goalKey}</span>:
                </a>
                <ul>
                    <li><b>Valid target:</b> <code dangerouslySetInnerHTML={{__html: resolveMarkdownLinks(goalData.target)}}></code>
                    </li>
                    {goalData.extends ?
                        <li>
                            <b>Extends goal: </b>
                            <a href={`#${goalData.extends}`} target="_blank" className="text-decoration-none text-primary">{goalData.extends}</a>
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
                                {hasDefaults ? <th scope="col"><b>Required</b></th> : <></>}
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {goalData.parameters.map((parameter, i) =>
                                <tr key={parameter.name + "-" + i}>
                                    <td><code className="small">{parameter.name}</code></td>
                                    <td dangerouslySetInnerHTML={{__html: resolveMarkdownLinks(parameter.type)}}></td>
                                    {hasDefaults ?
                                        <>
                                            <td><code>{parameter.default}</code></td>
                                            <td><code>{parameter.default ? "false" : "true"}</code></td>
                                        </> : <></>}
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </> : <></>}
                <div className="rounded-4 overflow-hidden">
                    <SyntaxHighlighter language="yaml" style={stackoverflowDark} showLineNumbers={true} customStyle={{margin: "0"}}
                                       onClick={(event: React.MouseEvent<HTMLPreElement, MouseEvent>) => {
                        const range = document.createRange();
                        range.selectNodeContents(event.currentTarget);
                        const selection = window.getSelection();
                        if (!selection) return;
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }}>
                        {
                            line(0, `spell:`) +
                            line(4, `spell-class: ".targeted.MobGoalEditSpell"`) +
                            line(4, `always-granted: true`) +
                            line(4, `cast-item: stick`) +
                            line(4, `add:`) +
                            line(8, `- goal: ${goalKey}`) +
                            line(10, `priority: 1`) +
                            (goalData.parameters.length ?
                                    line(10, `data:`) +
                                    goalData.parameters.map(parameter =>
                                        line(14, `${parameter.name}: ${parameter.default || ""}`)).join("")
                                    : ""
                            )
                        }
                    </SyntaxHighlighter>
                </div>
            </div>);
        })
    };
}

export default function Goals({hash, goals}: {hash: string, goals: Goals}) {
    const selected = goals.hasOwnProperty(hash) ? hash : null;
    const [found, setFound] = useState(search(goals, selected, ""));

    useEffect(() => {
        for (const pill of [...document.getElementsByClassName("goal-pill")]) {
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
    }, []);

    return (
        <>
            <a id="goals" href="#goals" className="text-decoration-none text-info h2">
                <i className="bi bi-hash"></i>Goals:
            </a>
            <hr/>
            <div className="container row">
                <div className="list-group col-4 text-break overflow-y-auto cm-scroller" style={{height: "85vh"}}
                     role="tablist" tabIndex={0}>
                    <form role="search" className="py-3">
                        <input className="form-control" type="search" placeholder="Search" onChange={event => {
                            setFound(search(goals, selected, event.currentTarget.value));
                        }} />
                    </form>
                    {found.list}
                </div>
                <div className="tab-content col-8 px-1">{found.docs}</div>
            </div>
        </>
    );
}
