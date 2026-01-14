"use cache";

import Link from "next/link";
import {Metadata} from "next";
import {cacheLife} from "next/dist/server/use-cache/cache-life";

import {metadata as oldMetadata} from "../page";
import * as MCVersionHandle from "@/handles/MCVersionHandle";
import {ParamsVersionType} from "./[version]/MCVersionParams";

export async function extendMetadata(versionType: string): Promise<Metadata> {
    const old = Object.assign({}, oldMetadata);
    if (old.openGraph) old.openGraph.url = "/howoldis/mc/" + versionType;
    return old;
}

export async function generateMetadata(props: ParamsVersionType): Promise<Metadata> {
    const {versionType} = await props.params;
    return extendMetadata(versionType);
}

export async function generateStaticParams() {
    return (await MCVersionHandle.getIds()).map(version => ({version}));
}

export default async function Page(props: ParamsVersionType) {
    cacheLife("hours");
    const {versionType} = await props.params;
    const versions = await MCVersionHandle.getIds(versionType);

    return (
        <div className="container py-5 vh-100 text-center">
            <h1>How old is Minecraft?</h1>
            <div className="row-cols-4 py-2">
                <Link className="btn btn-primary mx-2" type="button" href={"/howoldis/mc"} prefetch={true}>
                    <i className="bi bi-arrow-left-short"></i> Back
                </Link>
                {await MCVersionHandle.hasLatest(versionType) ?
                    <Link className="btn btn-info mx-2" type="button" href={`/howoldis/mc/${versionType}/latest`} prefetch={true}>
                        <i className="bi bi-clock"></i> Latest
                    </Link> :
                    <></>
                }
            </div>
            {versions.length ?
                <div className="list-group col-5 mx-auto d-grid py-3">
                    {versions.map(id =>
                        <Link className="list-group-item list-group-item-action"
                              href={`/howoldis/mc/${versionType}/${id}`} key={id} prefetch={true}>
                            {id}
                        </Link>
                    )}
                </div>
                :
                <h2 className="text-danger">This version type does not exist.</h2>
            }
        </div>
    );
}
