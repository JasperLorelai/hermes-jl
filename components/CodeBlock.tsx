"use client";

import React from "react";

import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import yaml from "react-syntax-highlighter/dist/esm/languages/hljs/yaml";
import {stackoverflowDark} from "react-syntax-highlighter/dist/esm/styles/hljs";

SyntaxHighlighter.registerLanguage("yaml", yaml);

export function line(num: number, code: string) {
    return " ".repeat(num) + code + "\n";
}

export default function CodeBlock({language, code}: {language: string, code: string}) {
    return (
        <div className="rounded-4 overflow-hidden">
            <SyntaxHighlighter language={language} style={stackoverflowDark} showLineNumbers={true} customStyle={{margin: "0"}}>
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
