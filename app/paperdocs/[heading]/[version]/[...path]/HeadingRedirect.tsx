"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";

import {Heading} from "./Heading";

/**
 * Turns:
 * - /paperdocs/io/papermc/...#some.hash -> /paperdocs/some.hash/io/papermc/...
 * - /paperdocs/io/papermc/...           -> /paperdocs/-/io/papermc/...
 */
export default function HeadingRedirect() {
    const router = useRouter();

    useEffect(() => {
        const redirect = () => {
            const hash = window.location.hash;
            let [heading, ...routes] = window.location.pathname.split("/").slice(2);
            let pathname;

            if (hash) {
                pathname = (Heading.isHeading(heading) ? "" : heading + "/") + routes.join("/");
                heading = Heading.toHeading(hash);
            } else {
                if (Heading.isHeading(heading)) return;
                pathname = heading + "/" + routes.join("/");
                heading = Heading.NO_HEADING;
            }

            router.push(`/paperdocs/${heading}/${pathname}`);
        };
        window.addEventListener("hashchange", redirect);
        redirect();

        return () => window.removeEventListener("hashchange", redirect);
    });

    return (<></>);
}
