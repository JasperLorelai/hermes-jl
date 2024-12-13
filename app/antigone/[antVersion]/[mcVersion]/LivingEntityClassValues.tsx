import React from "react";

export default function LivingEntityClassValues({entities}: {entities: string[]}) {
    return (
        <>
            <a id="LivingEntityClass" href="#LivingEntityClass" className="text-decoration-none text-info h2">
                <i className="bi bi-hash"></i><span className="text-primary">LivingEntityClass</span> values:
            </a>
            <hr/>
            <div className="d-flex text-center justify-content-center">
                <ul className="list-group w-50" id="LivingEntityClass-values">
                    {entities.map(value => <li className="list-group-item list-group-item-action" key={value}>
                        <code>{value}</code>
                    </li>)}
                </ul>
            </div>
        </>
    );
}
