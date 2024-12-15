import React from "react";

export default function Table({thead, tbody}: {thead: React.ReactNode, tbody: React.ReactNode}) {
    return (
        <table className="table table-hover table-striped table-bordered text-center rounded-4 overflow-hidden">
            <thead>{thead}</thead>
            <tbody className="table-group-divider">{tbody}</tbody>
        </table>
    );
}
