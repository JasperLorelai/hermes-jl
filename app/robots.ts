import {MetadataRoute} from "next"

const url = "https://jasperlorelai.eu/";
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/paperdocs"],
                disallow: [
                    "/webhook",
                    "/memberchart",
                    "/paperdocs/",
                    "/_next/",
                ]
            },
            {
                userAgent: "nsa",
                disallow: "/"
            },
        ],
        sitemap: url + "sitemap.xml"
    }
}
