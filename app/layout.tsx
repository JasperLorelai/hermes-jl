import React from "react";
import {Metadata} from "next";
import {Spectral} from "next/font/google";

import "bootstrap/dist/css/bootstrap.css";

import BootstrapJS from "./BootstrapJS";

const spectral = Spectral({subsets: ["latin"], weight: "400"});

export const metadata: Metadata = {
    viewport: {
        width: "device-width",
        initialScale: 1
    }
}

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en" data-bs-theme="dark">
            <BootstrapJS />
            <body className={"h-100 cm-scroller text-light bg-black " + spectral.className}>
                <main>{children}</main>
            </body>
        </html>
    );
}
