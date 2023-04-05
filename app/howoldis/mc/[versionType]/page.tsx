import Link from "next/link";

import {ParamsVersionType} from "./[version]/MCVersionParams";

export default function Page({params: {versionType}}: ParamsVersionType) {
    const allVersionData = require("public/mcVersionData.json") || {};
    const versionData = allVersionData[versionType];
    return (
        <div className="container py-5 vh-100 text-center">
            <h1>How old is Minecraft?</h1>
            <div className="row-cols-4 py-2">
                <Link className="btn btn-primary" type="button" href={"/howoldis/mc"}>
                    <i className="bi bi-arrow-left-short"></i>
                    Back
                </Link>
            </div>
            {versionData ?
                <div className="list-group col-5 mx-auto d-grid py-3">
                    {versionData.map((version: {id: string}) => {
                        const {id} = version;
                        return (
                            <Link className="list-group-item list-group-item-action"
                                  href={`/howoldis/mc/${versionType}/${id}`} key={id}>
                                {id}
                            </Link>
                        );
                    })}
                </div>
                :
                <h2 className="text-danger">This version type does not exist.</h2>
            }
        </div>
    );
}
