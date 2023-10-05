import fs from "fs";

const pathDir = "./public";
const path = pathDir + "/mcVersionData.json";

export async function register() {
    // Setup Viber
    fetch("https://chatapi.viber.com/pa/set_webhook", {
        method: "POST",
        body: JSON.stringify({url: "https://jasperlorelai.eu/api/viber", event_types: []}),
        headers: {"X-Viber-Auth-Token": process.env.VIBER_BOT_TOKEN}
    })
        .then(y => y.text())
        .then(console.log)
        .catch(console.error);

    // Setup MC Version data
    async function save() {
        const versions = await fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json").then(y => y.json());
        const versionData = {};
        for (const {type, id, releaseTime} of versions.versions || {}) {
            versionData[type] ??= [];
            versionData[type].push({id, releaseTime});
        }
        if (!fs.existsSync(pathDir)) fs.mkdirSync(pathDir);
        fs.writeFileSync(path, JSON.stringify(versionData, null, 4));
    }
    await save();
    setInterval(save, 24 * 60 * 60 * 1_000);
}
