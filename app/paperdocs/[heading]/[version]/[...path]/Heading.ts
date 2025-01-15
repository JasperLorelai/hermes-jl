export class Heading {

    public static readonly NO_HEADING = "-";

    private static readonly PATTERN = /[.-]/;

    // noinspection JSUnusedLocalSymbols
    private constructor() {}

    public static isHeading(string: string) {
        return Heading.PATTERN.test(string);
    }

    public static toHeading(hash: string) {
        if (["#enum-constant-summary", "#field-summary"].includes(hash)) return Heading.NO_HEADING;
        return hash ? (hash.startsWith("#") ? hash.substring(1) : hash) : Heading.NO_HEADING;
    }

    public static toHash(heading: string) {
        return heading === Heading.NO_HEADING ? "" : "#" + heading;
    }

}
