import fs from "fs";

const publicDir = "./public";

export async function register() {
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

    // Setup MC Version data
    async function saveMC() {
        const versions = await fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json").then(y => y.json());
        const versionData: any = {};
        for (const {type, id, releaseTime} of versions.versions || {}) {
            versionData[type] ??= [];
            versionData[type].push({id, releaseTime});
        }
        fs.writeFileSync(publicDir + "/mcVersionData.json", JSON.stringify(versionData));
    }
    await saveMC();
    setInterval(saveMC, 24 * 60 * 60 * 1_000);
}
