import React from "react";

export default function EntityClassValues({name, classes}: {name: string, classes: string[]}) {
    return (
        <>
            <a id={name} href={"#" + name} className="text-decoration-none text-info h2">
                <i className="bi bi-hash"></i><span className="text-primary">{name}</span> values:
            </a>
            <hr/>
            <div className="d-flex text-center justify-content-center">
                <ul className="list-group w-50" id={name + "-values"}>
                    {classes.map(value =>
                        <li className="list-group-item list-group-item-action" key={value}>
                            <code>{value}</code>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}
