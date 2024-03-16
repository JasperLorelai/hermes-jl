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
            <BootstrapJS/>
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2"/>
                <link rel="manifest" href="/site.webmanifest?v=2"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg?v=2" color="#ff0000"/>
                <link rel="shortcut icon" href="/favicon.ico?v=2"/>
                <meta name="msapplication-TileColor" content="#000000"/>
                <meta name="theme-color" content="#ffffff"/>
                <title>Jasper Lorelai&apos;s website</title>
            </head>
            <body className={"h-100 cm-scroller text-light bg-black " + font.className}>
            <main>{children}</main>
            </body>
        </html>
    );
}
