type Params<T> = {params: T};
type VersionType = {versionType: string};
type Version = {version: string};

export type ParamsVersionType = Params<VersionType>;
export type ParamsVersion = Params<VersionType & Version>;
