import React from "react";

import ProxyLinker from "./ProxyLinker";

export default function NotFound() {
    return (
        <div className="vh-100 d-flex flex-grow-1 justify-content-center align-items-center">
            <div>
                <h3 className="text-decoration-none text-primary">Paste PaperMC/SpigotMC JavaDocs URL:</h3>
                <hr/>
                {/* Below is a client component. */}
                <ProxyLinker />
            </div>
        </div>
    );
}
