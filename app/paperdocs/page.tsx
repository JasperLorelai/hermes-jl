import DocsPath from "./DocsPath";

export default function Page() {
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div>
                <h3 className="text-decoration-none text-primary">Paste PaperMC/SpigotMC JavaDocs URL:</h3>
                <hr/>
                <DocsPath />
            </div>
        </div>
    );
}
