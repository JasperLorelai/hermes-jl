import React, {Suspense} from "react";
import {Metadata, Viewport} from "next";
import localFont from "next/font/local";

import BootstrapJS from "./BootstrapJS";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const font = localFont({
    src: [
        {path: "../public/fonts/JetBrainsMono-Thin.woff2", weight: "100", style: "normal"},
        {path: "../public/fonts/JetBrainsMono-ThinItalic.woff2", weight: "100", style: "italic"},
        {path: "../public/fonts/JetBrainsMono-ExtraLight.woff2", weight: "200", style: "normal"},
        {path: "../public/fonts/JetBrainsMono-ExtraLightItalic.woff2", weight: "200", style: "italic"},
        {path: "../public/fonts/JetBrainsMono-Light.woff2", weight: "300", style: "normal"},
        {path: "../public/fonts/JetBrainsMono-LightItalic.woff2", weight: "300", style: "italic"},
        {path: "../public/fonts/JetBrainsMono-Regular.woff2", weight: "400", style: "normal"},
        {path: "../public/fonts/JetBrainsMono-Italic.woff2", weight: "400", style: "italic"},
        {path: "../public/fonts/JetBrainsMono-Medium.woff2", weight: "500", style: "normal"},
        {path: "../public/fonts/JetBrainsMono-MediumItalic.woff2", weight: "500", style: "italic"},
        {path: "../public/fonts/JetBrainsMono-SemiBold.woff2", weight: "600", style: "normal"},
        {path: "../public/fonts/JetBrainsMono-SemiBoldItalic.woff2", weight: "600", style: "italic"},
        {path: "../public/fonts/JetBrainsMono-Bold.woff2", weight: "700", style: "normal"},
        {path: "../public/fonts/JetBrainsMono-BoldItalic.woff2", weight: "700", style: "italic"},
        {path: "../public/fonts/JetBrainsMono-ExtraBold.woff2", weight: "800", style: "normal"},
        {path: "../public/fonts/JetBrainsMono-ExtraBoldItalic.woff2", weight: "800", style: "italic"},
    ],
    display: "swap"
});

import "../styles/general.css";

import LoadingSpinner from "@/components/LoadingSpinner";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NODE_ENV === "development" ?
        "http://localhost:" + process.env.PORT :
        "https://jasperlorelai.eu"
    ),
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1
};

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
                <main>
                    <Suspense fallback={<LoadingSpinner/>}>
                        {children}
                    </Suspense>
                </main>
            </body>
        </html>
    );
}
