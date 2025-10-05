"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";

import {Heading} from "./Heading";

export default function HeadingRedirect() {
    const router = useRouter();

    useEffect(() => {
        const redirect = () => {
            const href = Heading.upgrade(window.location.pathname, window.location.hash);
            if (href) router.push(href);
        };
        window.addEventListener("hashchange", redirect);
        redirect();

        return () => window.removeEventListener("hashchange", redirect);
    });

    return (<></>);
}
