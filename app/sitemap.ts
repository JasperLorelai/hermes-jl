import {MetadataRoute} from "next"

const url = "https://jasperlorelai.eu/";
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: url + "soundboard",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: url + "antigone",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: url + "howoldis",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: url + "discord",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.7,
        },
    ]
}
