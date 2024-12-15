import React from "react";

import Table from "@/components/Table";
import CodeBlock from "@/components/CodeBlock";

export default function PathfindingMalusTab({values}: {values: Record<string, number>}) {
    return (
        <>
            <h2 className="text-primary">Description:</h2>
            <hr/>
            <div>
                Before an entity calculates a path to walk on, it checks block types influencing its favoured path. A
                positive malus makes the entity less likely to walk over, around, or near certain blocks. Non-negative
                values make the path neutral or more favourable.
            </div>

            <h2 className="pt-3"><code>PathfindingMalusSpell</code>:</h2>
            <hr/>
            <div>
                Since each entity sometimes is spawned with a different malus because of what kind of blocks that entity
                may favour or avoid, Antigone offers the following Targeted Entity spell which can store an entity&#39;s
                pathfinding malus into a variable as well as override it.
            </div>
            <div className="px-5 my-3">
                <CodeBlock language="yaml" code='spell-class: "antigone.PathfindingMalusSpell"' />
                <div className="py-3" />
                <Table thead={
                    <tr>
                        <th scope="col"><b>Option</b></th>
                        <th scope="col"><b>Type</b></th>
                        <th scope="col"><b>Supports expressions</b></th>
                    </tr>
                } tbody={
                    <>
                        <tr>
                            <td><code>path-type</code></td>
                            <td><code>PathType</code></td>
                            <td><code>true</code></td>
                        </tr>
                        <tr>
                            <td><code>malus</code></td>
                            <td>Float</td>
                            <td><code>true</code></td>
                        </tr>
                        <tr>
                            <td><code>store-current</code></td>
                            <td>Variable name</td>
                            <td><code>false</code></td>
                        </tr>
                    </>
                } />
            </div>

            <h2 className="pt-3"><code>PathType</code>:</h2>
            <hr/>
            <div>
                Below is a table of path types and meta variables of each that Antigone provides which return a path
                type&#39;s default malus. Note that some entities spawn with a different malus because of what kind of
                blocks that entity avoids or prefers.
            </div>
            <div className="px-5 my-3">
                <Table thead={
                    <tr>
                        <th scope="col"><b>Path Type</b></th>
                        <th scope="col"><b>Meta Variable</b></th>
                        <th scope="col"><b>Malus</b></th>
                    </tr>
                } tbody={
                    Object.entries(values).map(([key, value], i) => (
                        <tr key={"malus-" + i}>
                            <td><code>{key}</code></td>
                            <td><code>{"meta_path_malus_" + key}</code></td>
                            <td><code>{value}</code></td>
                        </tr>
                    ))
                }/>
            </div>
        </>
    );
}
