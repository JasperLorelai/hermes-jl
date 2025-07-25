"use cache";

import Link from "next/link";
import {cacheLife} from "next/dist/server/use-cache/cache-life";

import {ParamsAntigoneVersion} from "./Params";
import * as AntigoneHandle from "@/handles/AntigoneHandle";

export async function generateStaticParams() {
    return (await AntigoneHandle.getTags()).map(antVersion => ({antVersion}));
}

export default async function Page({params}: ParamsAntigoneVersion) {
    cacheLife("hours");
    const {antVersion} = await params;
    const documentation = await AntigoneHandle.getDocs(antVersion);

    return (<>
        <h1 className="text-decoration-none text-primary">Versions:</h1>
        <hr/>
        {documentation ?
            <div className="text-center list-group col-6 d-grid">
                {Object.entries(documentation).reverse().map(([mcVersion, {supportedVersions}]) =>
                    <Link key={mcVersion} className="list-group-item list-group-item-action text-info"
                          href={`/antigone/${antVersion}/${mcVersion}`} prefetch={true}>
                        {supportedVersions}
                    </Link>
                )}
            </div> :
            <div className="text-danger">Could not load version data.</div>
        }
    </>);
}
