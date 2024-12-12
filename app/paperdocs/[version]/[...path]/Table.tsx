import React from "react";

import {AnyNode} from "domhandler";
import {Cheerio, CheerioAPI} from "cheerio";

export default function Table({$, summary} : {$: CheerioAPI, summary: Cheerio<AnyNode>}) {
    const headers: React.JSX.Element[] = [];
    const rows: React.JSX.Element[] = [];
    let buffer: React.JSX.Element[] = [];

    let removedColumn = "";
    let valueColumn = "";

    summary.children().each((i, child) => {
        const element = $(child);

        const classes = (element.attr("class") || "").split(" ");
        const column = classes.find(c => c.startsWith("col-"));
        if (!classes.length || !column) return;

        // Store removed column and value column class name - col-(first || second || last).
        if (classes.includes("table-header")) {
            let text = element.text();

            if (text === "Modifier and Type") {
                removedColumn = column;
                return;
            }

            // Rename value column.
            if (["Field", "Enum Constant", "Interface"].includes(text)) {
                valueColumn = column;
                text = "Value";
            }

            headers.push(<th key={text} className="px-2">{text}</th>);
            return;
        }

        if (column === removedColumn) return;

        if (buffer.length >= headers.length) {
            rows.push(<tr key={"row-" + i}>{buffer}</tr>);
            buffer = [];
        }

        // We prefer the value lowercased.
        const text = element.text().trim();
        const isValue = column === valueColumn;
        buffer.push(
            <td key={text} align={isValue ? "center" : "left"}>
                {isValue ?
                    <code className="small">{text.toLowerCase()}</code> :
                    text.startsWith("Deprecated.") ?
                        <><span className="text-danger">Deprecated.</span> {text.replace("Deprecated.", "").trim()}</> :
                        text
                }
            </td>
        );
    });
    rows.push(<tr key="row-last">{buffer}</tr>);

    return (
        <table className="table table-striped table-hover table-bordered rounded overflow-hidden">
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}
