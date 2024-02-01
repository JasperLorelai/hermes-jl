import fs from "fs";
import {unzipSync} from "fflate";

const publicDir = "./public";

export async function register() {
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

    // Setup Viber
    fetch("https://chatapi.viber.com/pa/set_webhook", {
        method: "POST",
        body: JSON.stringify({url: "https://jasperlorelai.eu/api/viber", event_types: []}),
        headers: {"X-Viber-Auth-Token": process.env.VIBER_BOT_TOKEN}
    })
        .then(y => y.text())
        .then(console.log)
        .catch(console.error);

    // Setup archive
    const archiveZip = "./../../archive/archive.zip";
    const archiveDir = publicDir + "/archive";
    if (fs.existsSync(archiveZip)) {
        if (fs.existsSync(archiveDir)) {
            fs.rmSync(archiveDir, {force: true, recursive: true, maxRetries: 100});
        }
        fs.mkdirSync(archiveDir);
        const unzipped = unzipSync(new Uint8Array(fs.readFileSync(archiveZip)));
        for (const [name, contents] of Object.entries(unzipped)) {
            const isDir = !contents.buffer.byteLength;
            const path = archiveDir + "/" + name;
            if (isDir) fs.mkdirSync(path);
            else fs.writeFileSync(path, Buffer.from(contents.buffer));
        }
    }

    // Setup MC Version data
    async function save() {
        const versions = await fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json").then(y => y.json());
        const versionData = {};
        for (const {type, id, releaseTime} of versions.versions || {}) {
            versionData[type] ??= [];
            versionData[type].push({id, releaseTime});
        }
        fs.writeFileSync(publicDir + "/mcVersionData.json", JSON.stringify(versionData, null, 4));
    }
    await save();
    setInterval(save, 24 * 60 * 60 * 1_000);
}
