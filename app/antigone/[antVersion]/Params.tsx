type Params<T> = {params: Promise<T>};

type Antigone = {antVersion: string};
type Minecraft = {mcVersion: string};
export type ParamsAntigoneVersion = Params<Antigone>;
export type ParamsMinecraftVersion = Params<Antigone & Minecraft>;
