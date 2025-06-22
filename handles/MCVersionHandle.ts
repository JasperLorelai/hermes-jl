import {Seconds} from "seconds-util";

type Release = {
    id: string;
    type: string;
    releaseTime: string;
}

type Manifest = {
    latest: Record<string, string>;
    versions: Release[];
}

type ReleaseTime = {
    age: string;
    date: Date;
};

export const cacheTime = 3600; // 1h

async function getManifest(): Promise<Manifest> {
    return await fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json", {next: {revalidate: cacheTime}}).then(y => y.json());
}

export async function getTypes() {
    const types: string[] = [];
    for (const {type} of (await getManifest()).versions) {
        if (types.includes(type)) continue;
        types.push(type);
    }
    return types;
}

export async function getIds(versionType?: string) {
    let {versions} = await getManifest();
    if (versionType) versions = versions.filter(({type}) => versionType === type);
    return versions.map(r => r.id);
}

export async function parseVersion(versionType: string, version: string) {
    if (version !== "latest" || !await hasLatest(versionType)) return version;
    return (await getManifest()).latest[versionType];
}

export async function getReleaseTime(version: string): Promise<ReleaseTime | null> {
    const release = (await getManifest()).versions.find(r => r.id === version);
    if (!release) return null;
    const date = new Date(release.releaseTime);
    return {date, age: Seconds.delta(date).duration().minutes()};
}

export async function hasLatest(versionType: string) {
    return Object.keys((await getManifest()).latest).includes(versionType);
}
