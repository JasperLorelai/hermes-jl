"use client";

import Link from "next/link";
import React, {useEffect, useState} from "react";

import LoadingSpinner from "../../components/LoadingSpinner";

export default function Page() {
    const [data, setData] = useState(<></>);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {(async () => {
       const tags: {name: string}[] = await fetch("https://api.github.com/repos/JasperLorelai/Antigone/tags").then(y => y.json());

       setData(<>{tags.map(({name}) =>
           <Link key={name} className="list-group-item list-group-item-action text-info" href={`/antigone/${name}`} prefetch={true}>
               {name}
           </Link>
       )}</>);
       setLoading(false);
    })()}, []);

    if (isLoading) return (<LoadingSpinner/>);
    return (
        <>
            <h1 className="text-decoration-none text-primary">Versions:</h1>
            <hr/>
            <div className="text-center list-group col-6 d-grid">{data}</div>
        </>
    );
}
