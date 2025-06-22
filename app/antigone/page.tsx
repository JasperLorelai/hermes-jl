"use cache";

import React from "react";
import Link from "next/link";
import {cacheLife} from "next/dist/server/use-cache/cache-life";

import * as AntigoneHandle from "@/handles/AntigoneHandle";

export default async function Page() {
    cacheLife("hours");
    const tags = await AntigoneHandle.getTags();

    return (
        <>
            <h1 className="text-decoration-none text-primary">Versions:</h1>
            <hr/>
            <div className="text-center list-group col-6 d-grid">
                {tags.map(tag =>
                    <Link key={tag} className="list-group-item list-group-item-action text-info" href={`/antigone/${tag}`} prefetch={true}>
                        {tag}
                    </Link>
                )}
            </div>
        </>
    );
}
