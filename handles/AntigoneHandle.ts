import DocumentationFixes from "../app/antigone/[antVersion]/[mcVersion]/DocumentationFixes";

export const cacheTime = 3600; // 1h

export async function getTags() {
    const tags: {name: string}[] = await fetch("https://api.github.com/repos/JasperLorelai/Antigone/tags", {next: {revalidate: cacheTime}}).then(y => y.json());
    return tags.map(({name}) => name);
}

export async function getDocs(tag: string) {
    const response = await fetch(`https://raw.githubusercontent.com/JasperLorelai/Antigone/${tag}/docs/docs.json`, {next: {revalidate: cacheTime}}).then(y => y.json());
    return DocumentationFixes.addVersionStrings(response);
}
