import {Usable} from "react";

type Params<T> = {params: Usable<T>};

type Antigone = {antVersion: string};
type Minecraft = {mcVersion: string};
export type ParamsAntigoneVersion = Params<Antigone>;
export type ParamsMinecraftVersion = Params<Antigone & Minecraft>;
