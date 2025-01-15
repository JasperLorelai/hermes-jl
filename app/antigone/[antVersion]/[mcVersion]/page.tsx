"use client";

import React, {useContext, use} from "react";

import SemVer from "semver";

import GoalsTab from "./GoalsTab";
import PaneSelector from "./PaneSelector";
import {ParamsMinecraftVersion} from "../Params";
import DocumentationFixes from "./DocumentationFixes";
import PathfindingMalusTab from "./PathfindingMalusTab";
import DocumentationContext from "../DocumentationContext";
import LivingEntityClassValues from "./LivingEntityClassValues";

export default function Page(props: ParamsMinecraftVersion) {
    let {antVersion, mcVersion} = use(props.params);

    const documentation = useContext(DocumentationContext)?.[mcVersion];
    if (!documentation) return (<div className="text-danger">Could not load version data.</div>);
    const {LivingEntityClass, PathfindingMalus} = documentation;

    const coercedMcVersion = SemVer.coerce(mcVersion.replace(/_/g, "."))?.toString() || "";
    const goals = DocumentationFixes.initialFilter(antVersion, coercedMcVersion, documentation.goals);

    return (
        <>
            <h1 className="text-primary">Selected Version:</h1>
            <hr/>
            <div>Antigone Version: <span className="text-primary fw-bold">{antVersion}</span></div>
            <div>Minecraft Version: <span className="text-primary fw-bold">{coercedMcVersion}</span></div>
            <hr/>
            <PaneSelector panes={[
                {id: "goals", name: "Goals", content: <GoalsTab goals={goals}/>},
                {id: "LivingEntityClass", name: "LivingEntityClass", content: <LivingEntityClassValues entities={LivingEntityClass}/>},
                {id: "PathfindingMalus", name: "Pathfinding Malus", content: PathfindingMalus ? <PathfindingMalusTab values={PathfindingMalus} /> : null},
            ]}/>
            <hr/>
        </>
    );
}
