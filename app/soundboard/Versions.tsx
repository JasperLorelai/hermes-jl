"use client";

import React, {ChangeEvent} from "react";

export default function Versions({versions}: {versions: React.ReactElement[]}) {
    function onChange(e: ChangeEvent<HTMLSelectElement>) {
        const el = document.getElementById(e.target.value);
        if (!el) return;
        const panes = document.getElementsByClassName("tab-pane");
        for (const pane of panes) {
            if (el === pane) pane.classList.add("show", "active");
            else pane.classList.remove("show", "active");
        }
    }

    return (
        <select className="form-select form-select-lg mb-3 px-5 text-center w-auto" defaultValue={0} onChange={onChange}>
            {versions}
        </select>
    );
}
