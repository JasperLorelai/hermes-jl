"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

type URL = {
    url: string,
    replace: (input: string) => string
}

const urls: {[name: string]: URL} = {
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

export default function DocsPath() {
    const [border, setBorder] = useState(Border.SECONDARY);
    const router = useRouter();

    return (
        <input type="text"
               className={"form-control border-" + Border[border].toLowerCase()}
               placeholder="https://jd.papermc.io/paper/1.21/org/bukkit/Art.html"
               onChange={event => {
                   const input = event.currentTarget.value;
                   for (let url of Object.values(urls)) {
                       if (!input.startsWith(url.url)) continue;
                       setBorder(Border.PRIMARY);
                       router.push("/paperdocs/" + url.replace(input));
                       return;
                   }
                   setBorder(Border.DANGER);
               }}
        ></input>
    );
}

enum Border {
    PRIMARY,
    SECONDARY,
    DANGER
}
