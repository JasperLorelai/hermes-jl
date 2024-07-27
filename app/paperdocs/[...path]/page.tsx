import React from "react";

import Versions from "./Versions";

export default function Page({params: {path}}: {params: {path: string[]}}) {
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div>
                <h1 className="text-decoration-none text-primary">Minecraft Version:</h1>
                <hr/>
                <div className="text-center list-group">
                    <Versions path={path.join("/")} />
                </div>
            </div>
        </div>
    );
}
