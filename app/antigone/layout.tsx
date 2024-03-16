import React from "react";
import {Metadata} from "next";

const title = "Documentation - Antigone";
export const metadata: Metadata = {
    title,
    themeColor: "#0296ff",
    twitter: {card: "summary"},
    openGraph: {
        title,
        siteName: title,
        url: "/docs/antigone/",
        description: "View documentation for the Antigone, a MagicSpells addon.",
        images: "https://files.jasperlorelai.eu/projects/images/antigone.png"
    }
}

export default function Layout({children}: {children: React.ReactNode}) {
    return (<>
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="https://jasperlorelai.eu/antigone">Antigone</a>
                <button className="navbar-toggler collapsed" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="navbar-collapse collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item" key="repository">
                            <a className="nav-link" target="_blank" href="https://github.com/JasperLorelai/Antigone">Project Repository</a>
                        </li>
                        <li className="nav-item" key="ms_repository">
                            <a className="nav-link" target="_blank" href="https://github.com/TheComputerGeek2/MagicSpells">MagicSpells Repository</a>
                        </li>
                        <li className="nav-item" key="download">
                            <a className="nav-link text-white fw-bold" target="_blank" href="https://github.com/JasperLorelai/Antigone/releases">Download</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div className="container lh-lg pt-sm-5">
            <h1 className="text-primary">Introduction:</h1>
            <hr/>
            <p className="py-3">
                Antigone is a <a href="https://github.com/TheComputerGeek2/MagicSpells/"
                                 target="_blank">MagicSpells</a> plugin
                addon intended to provide Vanilla Mob Goals into <a
                href="https://github.com/TheComputerGeek2/MagicSpells/wiki/Mob-Goal-Edit-Spell"
                target="_blank">MagicSpells&apos; Mob Goal Edit Spell</a>. Note all values are required unless they have
                a default value. All values
                support <a href="https://github.com/TheComputerGeek2/MagicSpells/wiki/Expression"
                           target="_blank">expressions</a> except for
                Modifier lists.
            </p>

            {children}
        </div>
    </>);
}
