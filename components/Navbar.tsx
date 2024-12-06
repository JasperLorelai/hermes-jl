import Link from "next/link";
import {HTMLAttributeAnchorTarget} from "react";

type Brand = {
    url: string;
    text: string;
};

type NavItem = {
    key: string;
    url: string;
    text: string;
    target: HTMLAttributeAnchorTarget | undefined;
};

export default function Navbar({brand, items}: {brand: Brand, items?: NavItem[]}) {
    return (
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                {link(brand.url, brand.text)}
                {items?.length ?
                    <>
                        <button className="navbar-toggler collapsed" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="navbar-collapse collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {items.map(item => (
                                    <li className="nav-item" key={item.key}>{link(item.url, item.text, item.target)}</li>
                                ))}
                            </ul>
                        </div>
                    </> :
                    <></>
                }
            </div>
        </nav>
    );
}

function link(url: string, text: string, target: HTMLAttributeAnchorTarget = "_self") {
    return url.startsWith("/") ?
        <Link className="nav-link" target={target} href={url} prefetch={true}>{text}</Link> :
        <a className="nav-link" target={target} href={url}>{text}</a>
}
