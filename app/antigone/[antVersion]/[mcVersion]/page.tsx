"use cache";

import React from "react";
import {cacheLife} from "next/dist/server/use-cache/cache-life";

import GoalsTab from "./GoalsTab";
import PaneSelector from "./PaneSelector";
import {ParamsMinecraftVersion} from "../Params";
import DocumentationFixes from "./DocumentationFixes";
import PathfindingMalusTab from "./PathfindingMalusTab";
import * as AntigoneHandle from "@/handles/AntigoneHandle";
import LivingEntityClassValues from "./LivingEntityClassValues";

export default async function Page({params}: ParamsMinecraftVersion) {
    cacheLife("hours");
    const {antVersion, mcVersion} = await params;

    const documentationFull = await AntigoneHandle.getDocs(antVersion);
    const documentation = documentationFull ? documentationFull[mcVersion] : null;
    if (!documentation) return (<div className="text-danger">Could not load version data.</div>);
    const {cleanVersion, supportedVersions, LivingEntityClass, PathfindingMalus} = documentation;

    const goals = DocumentationFixes.initialFilter(antVersion, cleanVersion, documentation.goals);

    return (
        <>
            <h1 className="text-primary">Selected Version:</h1>
            <hr/>
            <div>Antigone Version: <span className="text-primary fw-bold">{antVersion}</span></div>
            <div>Supported Minecraft Versions: <span className="text-primary fw-bold">{supportedVersions}</span></div>
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
