"use client";

import Link from "next/link";

import {useContext} from "react";

import {ParamsAntigoneVersion} from "./Params";
import DocumentationContext from "./DocumentationContext";

export default function Page({params: {antVersion}}: ParamsAntigoneVersion) {
    const documentation = useContext(DocumentationContext);

    return (<>
        <h1 className="text-decoration-none text-primary">Versions:</h1>
        <hr/>
        {documentation ?
            <div className="text-center list-group col-6 d-grid">
                {Object.keys(documentation).map(mcVersion =>
                    <Link key={mcVersion} className="list-group-item list-group-item-action text-info"
                          href={`/antigone/${antVersion}/${mcVersion}`} prefetch={true}>
                        {mcVersion}
                    </Link>
                )}
            </div> :
            <div className="text-danger">Could not load version data.</div>
        }
    </>);
}
