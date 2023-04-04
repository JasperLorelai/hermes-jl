"use client";

import React, {useEffect} from "react";

import {Spectral} from "@next/font/google";

import "bootstrap/dist/css/bootstrap.css";

const spectral = Spectral({subsets: ["latin"], weight: "400"});

export default function RootLayout({children}: {children: React.ReactNode}) {
    useEffect(() => {
        require("bootstrap");
    }, []);
    return (
        <html lang="en" data-bs-theme="dark">
            <body className={"h-100 cm-scroller text-light bg-black " + spectral.className}>
                <main>{children}</main>
            </body>
        </html>
    );
}
