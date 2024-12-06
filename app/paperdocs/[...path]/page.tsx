import React from "react";

import Versions from "./Versions";
import Navbar from "../../../components/Navbar";

export default async function Page(props: {params: Promise<{path: string[]}>}) {
    const {path} = await props.params;
    return (
        <>
            <Navbar brand={{text: "Create New URL", url: "/paperdocs"}} />
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <div>
                    <h1 className="text-decoration-none text-primary">Minecraft Version:</h1>
                    <hr/>
                    <div className="text-center list-group">
                        <Versions path={path.join("/")}/>
                    </div>
                </div>
            </div>
        </>
    );
}
