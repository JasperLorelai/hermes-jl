"use client";

import "../../styles/general.css";

import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

import {keymap} from "@codemirror/view";
import {basicSetup, EditorView} from "codemirror";
import {indentWithTab} from "@codemirror/commands";
import {atomone} from "@uiw/codemirror-theme-atomone";
import * as yamlMode from "@codemirror/legacy-modes/mode/yaml";
import {StreamLanguage, LanguageSupport} from "@codemirror/language";

const hints = [
    "Connecting to the interwebz",
    "Communicating with the AIs",
    "Rating your spells",
    "Consulting the Wiki",
    "Having trouble with spelling",
    "Downloading more RAM",
    "Uploading",
    "Simulating particles",
    "I forgor how this works 💀",
    "Transmitting all the Clacks",
    "Deleting some spells",
    "Crossing fingers",
    "Initialising",
    "Almost there",
].map(e => e + "...");

export default function SpellAnalyser() {
    const router = useRouter();
    const [modalBody, setModalBody] = useState(<></>);
    const [editorView, setEditorView] = useState<EditorView | null>(null);

    useEffect(() => {
        // Initialise a single instance of the editor.
        if (editorView === null) {
            const yamlLanguage = new LanguageSupport(StreamLanguage.define(yamlMode.yaml));
            const height = EditorView.theme({"&": {height: "70vh", "border": "solid var(--jl-blue-light)"}});
            const view = new EditorView({
                extensions: [
                    basicSetup,
                    yamlLanguage,
                    atomone,
                    keymap.of([indentWithTab]),
                    height,
                    EditorView.lineWrapping
                ],
                parent: document.getElementById("code") || undefined
            });
            setEditorView(view);
        }

        const modal = document.getElementById("analyse-modal");
        if (!modal) return;
        let isClosed = false;
        modal.addEventListener("shown.bs.modal", _ => {
            if (!editorView) return;
            const {doc} = editorView.state;
            const text = doc.toJSON().join("\n");
            if (!text) {
                setModalBody(<h1>Please enter some text to analyse.</h1>);
                return;
            }

            // 10% of the number of lines included just to make it more realistic. Limit by [12, <hints> * 3]
            let time = doc.lines;
            time = Math.max(time, 12);
            time = Math.min(time, hints.length * 3);
            const timeProgressTotal = time;
            const timerHintTotal = 3;

            isClosed = false;
            let timerProgress = 0;
            let timerHint = 0;
            let hint: string | undefined;
            const intervalId = setInterval(() => {
                if (isClosed) {
                    clearInterval(intervalId);
                    return;
                }

                // Finished analysing.
                if (timerProgress >= timeProgressTotal) {
                    setModalBody(<h1>Errors found. Fix them.</h1>);
                    clearInterval(intervalId);
                    setTimeout(() => {
                        const vid = Buffer.from("ZFF3NHc5V2dYY1E=", "base64");
                        window.location.href = `https://www.youtube.com/watch?v=${vid}/`;
                    }, 1_000);
                    return;
                }

                // Generate new hint every <timerHintTotal> seconds.
                if (timerHint == timerHintTotal) timerHint = 0;
                if (timerHint == 0) {
                    let tempHint = hint;
                    while (tempHint === hint) {
                        tempHint = hints.at(Math.floor(Math.random() * (hints.length)));
                    }
                    hint = tempHint;
                }

                setModalBody(
                    <>
                        <h1>{hint}</h1>
                        <div className="progress my-5" role="progressbar">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{
                                "width": `${timerProgress / timeProgressTotal * 100}%`
                            }}/>
                        </div>
                    </>
                );

                timerProgress++;
                timerHint++;
            }, 1_000);
        });
        modal.addEventListener("hide.bs.modal", _ => isClosed = true);
    }, [editorView, router]);

    return (
        <div className="container vh-100 lh-lg p-sm-5 my-3">
            <h1 className="text-center">Spell Analyser</h1>
            <div className="py-3" id="code" />
            <button type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#analyse-modal">Analyse</button>

            <div className="modal fade" id="analyse-modal" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content bg-dark">
                        <div className="modal-header custom-modal-header-color">
                            <h1 className="modal-title fs-5">Spell Analyser</h1>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"/>
                        </div>
                        <div className="modal-body">{modalBody}</div>
                        <div className="modal-footer custom-modal-footer-color">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
