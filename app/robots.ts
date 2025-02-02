import {MetadataRoute} from "next"

const url = "https://jasperlorelai.eu/";
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/webhook/", "/memberchart/"]
            },
            {
                userAgent: "nsa",
                disallow: "/"
            },
        ],
        sitemap: url + "sitemap.xml"
    }
}
