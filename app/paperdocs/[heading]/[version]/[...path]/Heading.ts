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
    
    /**
     * Turns:
     * - /paperdocs/io/papermc/...#some.hash -> /paperdocs/some.hash/io/papermc/...
     * - /paperdocs/io/papermc/...           -> /paperdocs/-/io/papermc/...
     * @return Returns null when already upgraded.
     */
    public static upgrade(originalPathname: string, originalHash: string | undefined): (string | null) {
        let [heading, ...routes] = originalPathname.split("/").slice(2);
        let pathname;
        
        if (originalHash) {
            pathname = (Heading.isHeading(heading) ? "" : heading + "/") + routes.join("/");
            heading = Heading.toHeading(originalHash);
        } else {
            if (Heading.isHeading(heading)) return null;
            pathname = heading + "/" + routes.join("/");
            heading = Heading.NO_HEADING;
        }
        
        return `/paperdocs/${heading}/${pathname}`;
    }
    
}
