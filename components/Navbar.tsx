import Link from "next/link";
import React, {HTMLAttributeAnchorTarget} from "react";

interface Link {
    url: string;
    text: string;
    target?: HTMLAttributeAnchorTarget;
}

export default function Navbar({brand, links, children}: {brand: Link | string, links?: Link[], children?: React.ReactNode}) {
    return (
        <nav className="navbar navbar-expand-lg bg-primary bg-gradient bg-opacity-75 nav-underline">
            <div className="container-fluid">
                <div className="navbar-brand">{typeof brand === "string" ? brand : item(brand)}</div>
                {links?.length || children ?
                    <>
                        <button className="navbar-toggler collapsed" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="navbar-collapse collapse justify-content-between" id="navbarNav">
                            {links?.length ?
                                <ul className="navbar-nav gap-3">
                                    {links.map((link, i) => navItem(item(link), "nav-item-" + i))}
                                </ul> :
                                <></>
                            }
                            {children ? <ul className="navbar-nav gap-3">{navItems(children)}</ul> : <></>}
                        </div>
                    </> :
                    <></>
                }
            </div>
        </nav>
    );
}

function navItems(node: React.ReactNode) {
    return Symbol.iterator in Object(node) ?
        // @ts-ignore
        [...node].map((item, i) => navItem(item, "nav-item-" + i)) :
        navItem(node, "nav-item");
}

function navItem(child: React.ReactNode, key: string) {
    return (<li className="nav-item align-content-center" key={key}>{child}</li>)
}

function item(link: Link | string) {
    if (typeof link === "string") return link;

    const {url, text} = link;
    const target = link.target || "_self";
    return url.startsWith("/") ?
        <Link className="nav-link" target={link.target} href={url} prefetch={true}>{text}</Link> :
        <a className="nav-link" target={target} href={url}>{text}</a>
}
