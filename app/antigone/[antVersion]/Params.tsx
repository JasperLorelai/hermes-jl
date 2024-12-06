import {Usable} from "react";

type Params<T> = {params: Usable<T>};

export type ParamsAntigoneVersion = Params<{antVersion: string}>;
export type ParamsMinecraftVersion = Params<{mcVersion: string}>;
