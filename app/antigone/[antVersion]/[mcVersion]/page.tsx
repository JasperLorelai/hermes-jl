"use client";

import React, {useContext, use} from "react";

import Goals from "./Goals";
import {ParamsMinecraftVersion} from "../Params";
import PaneSelector from "./PaneSelector";
import DocumentationContext from "../DocumentationContext";
import LivingEntityClassValues from "./LivingEntityClassValues";

export default function Page(props: ParamsMinecraftVersion) {
    const {antVersion, mcVersion} = use(props.params);

    const hash = window.location.hash.substring(1);
    const documentation = useContext(DocumentationContext)?.[mcVersion];
    if (!documentation) return (<div className="text-danger">Could not load version data.</div>);
    const {goals, LivingEntityClass} = documentation;

    return (
        <>
            <h1 className="text-primary">Selected Version:</h1>
            <hr/>
            <div>Antigone Version: <span className="text-primary fw-bold">{antVersion}</span></div>
            <div>Minecraft Version: <span className="text-primary fw-bold">{mcVersion}</span></div>
            <hr/>
            <PaneSelector antVersion={antVersion} mcVersion={mcVersion} hash={hash} panes={[
                {id: "goals", name: "Goals", content: <Goals hash={hash} goals={goals}/>},
                {id: "LivingEntityClass", name: "LivingEntityClass", content: <LivingEntityClassValues entities={LivingEntityClass}/>},
            ]}/>
            <hr/>
        </>
    );
}
