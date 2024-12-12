"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";

import LoadingSpinner from "@/components/LoadingSpinner";

type URL = {
    url: string,
    replace: (input: string) => string
}

const placeholder = "https://jd.papermc.io/paper/1.21/org/bukkit/Art.html";
const urls: { [name: string]: URL } = {
    bukkit: {
        url: "https://hub.spigotmc.org/javadocs/bukkit/",
        replace: i => i.replace(urls.bukkit.url, "")
    },
    spigot: {
        url: "https://hub.spigotmc.org/javadocs/spigot/",
        replace: i => i.replace(urls.spigot.url, "")
    },
    paper: {
        url: "https://jd.papermc.io/paper/",
        replace: i => i.replace(/^https:\/\/jd\.papermc\.io\/paper\/\d\.\d+(\.\d+)?\//, "")
    },
};

export default function ProxyLinker() {
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    return isLoading ?
        <LoadingSpinner /> :
        <input type="text" className="form-control border-secondary" placeholder={placeholder} onChange={event => {
            const input = event.currentTarget.value;
            for (let url of Object.values(urls)) {
                if (!input.startsWith(url.url)) continue;
                setLoading(true);
                router.push("/paperdocs/" + url.replace(input));
                return;
            }
            event.currentTarget.classList.replace("border-danger", "border-danger");
        }} />
    ;
}
