"use client";

import React, {useContext, use} from "react";

import SemVer from "semver";

import Goals from "./Goals";
import PaneSelector from "./PaneSelector";
import {ParamsMinecraftVersion} from "../Params";
import PathfindingMalusTab from "./PathfindingMalusTab";
import DocumentationContext from "../DocumentationContext";
import LivingEntityClassValues from "./LivingEntityClassValues";

export default function Page(props: ParamsMinecraftVersion) {
    let {antVersion, mcVersion} = use(props.params);

    const hash = window.location.hash.substring(1);
    const documentation = useContext(DocumentationContext)?.[mcVersion];
    if (!documentation) return (<div className="text-danger">Could not load version data.</div>);
    const {goals, LivingEntityClass, PathfindingMalus} = documentation;

    mcVersion = SemVer.coerce(mcVersion.replace(/_/g, "."))?.toString() || "";
    return (
        <>
            <h1 className="text-primary">Selected Version:</h1>
            <hr/>
            <div>Antigone Version: <span className="text-primary fw-bold">{antVersion}</span></div>
            <div>Minecraft Version: <span className="text-primary fw-bold">{mcVersion}</span></div>
            <hr/>
            <PaneSelector hash={hash} panes={[
                {id: "goals", name: "Goals", content: <Goals antVersion={antVersion} mcVersion={mcVersion} hash={hash} goals={goals}/>},
                {id: "LivingEntityClass", name: "LivingEntityClass", content: <LivingEntityClassValues entities={LivingEntityClass}/>},
                {id: "PathfindingMalus", name: "Pathfinding Malus", content: PathfindingMalus ? <PathfindingMalusTab values={PathfindingMalus} /> : null},
            ]}/>
            <hr/>
        </>
    );
}
