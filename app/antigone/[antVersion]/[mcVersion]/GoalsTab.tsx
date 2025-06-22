"use client";

import React, {ReactNode, useEffect, useState} from "react";

import Table from "@/components/Table";
import CodeBlock, {line} from "@/components/CodeBlock";

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
                {goalData.bugs ?
                    goalData.bugs.map((bug, i) => {
                        return (
                            <div className="alert alert-danger my-3" role="alert" key={"bug-" + i}>
                                <i className="bi bi-exclamation-triangle"></i> {bug}
                            </div>
                        );
                    }) :
                    ""
                }
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
                    <Table thead={
                        <tr>
                            <th scope="col"><b>Option</b></th>
                            <th scope="col"><b>Type</b></th>
                            {hasDefaults ? <th scope="col"><b>Default</b></th> : <></>}
                            {hasDefaults ? <th scope="col"><b>Required</b></th> : <></>}
                        </tr>
                    } tbody={
                        goalData.parameters.map((parameter, i) =>
                            <tr key={parameter.name + "-" + i}>
                                <td><code className="small">{parameter.name}</code></td>
                                <td dangerouslySetInnerHTML={{__html: resolveMarkdownLinks(parameter.type)}}></td>
                                {hasDefaults ?
                                    <>
                                        <td><code>{parameter.default}</code></td>
                                        <td><code>{parameter.default ? "false" : "true"}</code></td>
                                    </> : <></>}
                            </tr>
                        )
                    } />
                </> : <></>}
                <CodeBlock language="yaml" code={
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
                } />
            </div>);
        })
    };
}

export default function GoalsTab({goals}: {goals: Goals}) {
    const hash = window.location.hash.substring(1);
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
