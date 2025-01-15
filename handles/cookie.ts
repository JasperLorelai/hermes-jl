export default class Cookie {

    // noinspection JSUnusedLocalSymbols
    private constructor(private document: Document) {}

    public static from(document: Document) {
        return new Cookie(document);
    }

    public set(cookieName: string, value: string) {
        this.document.cookie = `${cookieName}=${value}`;
    }

    public get(cookieName: string) {
        let name = cookieName + "=";
        for (let cookie of decodeURIComponent(this.document.cookie).split(";")) {
            cookie = cookie.trim();
            if (cookie.indexOf(name) != 0) continue;
            return cookie.substring(name.length, cookie.length);
        }
        return "";
    }

}
