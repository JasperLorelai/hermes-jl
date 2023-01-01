module.exports = function() {
    fetch("https://chatapi.viber.com/pa/set_webhook", {
        method: "POST",
        body: JSON.stringify({url: "https://jasperlorelai.eu/api/viber", event_types: []}),
        headers: {"X-Viber-Auth-Token": process.env.VIBER_BOT_TOKEN}
    })
        .then(y => y.text())
        .then(console.log)
        .catch(console.error);
}
