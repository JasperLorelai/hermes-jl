"use client";

import React, {useEffect, useState, use} from "react";

import {ParamsAntigoneVersion} from "./Params";
import {DocumentationFull} from "./Documentation";
import DocumentationContext from "./DocumentationContext";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function Layout(props: {children: React.ReactNode} & ParamsAntigoneVersion) {
    const {antVersion} = use(props.params);

    const [documentation, setDocumentation] = useState<DocumentationFull | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/JasperLorelai/Antigone/${antVersion}/docs/docs.json`)
            .then(y => y.json())
            .then((documentation: DocumentationFull) => {
                setLoading(false);
                setDocumentation(documentation);
            })
            .catch(_ => setLoading(false));
    }, [antVersion]);

    if (isLoading) return (<LoadingSpinner/>);
    return (
        <DocumentationContext.Provider value={documentation}>
            {props.children}
        </DocumentationContext.Provider>
    );
}