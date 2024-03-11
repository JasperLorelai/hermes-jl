import React from "react";
import {Metadata} from "next";
import localFont from "next/font/local";

import BootstrapJS from "./BootstrapJS";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const font = localFont({src: "../public/Monocraft-no-ligatures.ttf", weight: "300"});

import "../styles/general.css";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NODE_ENV === "development" ?
        "http://localhost:" + process.env.PORT :
        "https://jasperlorelai.eu"
    ),
    viewport: {
        width: "device-width",
        initialScale: 1
    }
}

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en" data-bs-theme="dark">
            <BootstrapJS />
            <body className={"h-100 cm-scroller text-light bg-black " + font.className}>
                <main>{children}</main>
            </body>
        </html>
    );
}
