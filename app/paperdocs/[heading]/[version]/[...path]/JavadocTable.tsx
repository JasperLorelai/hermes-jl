import React from "react";

import {AnyNode} from "domhandler";
import {Cheerio, CheerioAPI} from "cheerio";

import Table from "@/components/Table";

function IndexHeader() {
    return (<th className="px-2 text-secondary">#</th>);
}

function IndexCell({id}: {id: number}) {
    return (<td align="center" className="small text-secondary-emphasis">{id}</td>);
}

export default function JavadocTable({$, summary} : {$: CheerioAPI, summary: Cheerio<AnyNode>}) {
    const headers: React.JSX.Element[] = [<IndexHeader key="Index" />];
    const rows: React.JSX.Element[] = [];
    let buffer: React.JSX.Element[] = [<IndexCell key="index-0" id={0} />];

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
            buffer = [<IndexCell key={"index-" + rows.length} id={rows.length} />];
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

    return (<Table thead={<tr>{headers}</tr>} tbody={rows} />);
}
