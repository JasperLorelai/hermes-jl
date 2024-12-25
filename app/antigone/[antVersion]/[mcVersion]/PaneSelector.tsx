import React, {ReactNode, useEffect} from "react";

type Pane = {
    id: string,
    name: string,
    content?: ReactNode
};

function active(hash: string, isHashPane: boolean, index: number, anchor: string, activeClasses: string) {
    return (isHashPane ? hash === anchor : index === 0) ? " " + activeClasses : "";
}

export default function PaneSelector({panes}: {panes: Pane[]}) {
    panes = panes.filter(pane => pane.content);
    const hash = window.location.hash.substring(1);
    const isHashPane = panes.some(p => p.id === hash);

    useEffect(() => {
        for (const pane of [...document.getElementsByClassName("pane-button")]) {
            function swapper() {
                if (pane.classList.contains("active"))
                    pane.classList.add("bg-primary");
                else pane.classList.remove("bg-primary");
                console.log(pane.classList.toString());
            }
            pane.addEventListener("hidden.bs.tab", swapper);
            pane.addEventListener("shown.bs.tab", swapper);
        }
    }, []);

    return (
        <>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {panes.map((pane, i) =>
                        <button
                            className={"nav-link pane-button" + active(hash, isHashPane, i, pane.id, "active bg-primary")}
                            data-bs-toggle="tab" data-bs-target={`#nav-${pane.id}`}
                            type="button" role="tab" key={pane.id}>
                            {pane.name}
                        </button>
                    )}
                </div>
            </nav>
            <div className="tab-content bg-less-dark p-3 border">
                {panes.map((pane, i) =>
                    <div className={"tab-pane fade" + active(hash, isHashPane, i, pane.id, "active show")}
                         id={`nav-${pane.id}`} role="tabpanel" tabIndex={0} key={pane.id}>
                        {pane.content}
                    </div>
                )}
            </div>
        </>
    );
}
