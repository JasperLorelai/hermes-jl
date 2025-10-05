export default function getBaseURL() {
    return process.env.NODE_ENV === "development" ?
        `http://localhost:${process.env.PORT}/` :
        "https://jasperlorelai.eu/"
    ;
}
