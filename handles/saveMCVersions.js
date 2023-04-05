const fs = require("node:fs");

const minecraftVersions = "https://launchermeta.mojang.com/mc/game/version_manifest.json";
const interval = 24 * 60 * 60 * 1_000;
const pathDir = "./public";
const path = pathDir + "/mcVersionData.json";

module.exports = async () => {
    async function save() {
        const versions = await fetch(minecraftVersions).then(y => y.json());
        const versionData = {};
        for (const {type, id, releaseTime} of versions.versions || {}) {
            versionData[type] ??= [];
            versionData[type].push({id, releaseTime});
        }
        if (!fs.existsSync(pathDir)) fs.mkdirSync(pathDir);
        fs.writeFileSync(path, JSON.stringify(versionData, null, 4));
    }
    await save();
    setInterval(save, interval);
}
