import {ReactNode} from "react";

type GoalData = {
    target: string,
    extends?: string,
    bugs?: ReactNode[],
    parameters: {
        type: string,
        name?: string,
        default?: string
    }[]
};

export type Goals = Record<string, GoalData>;

export type Documentation = {
    LivingEntityClass: string[],
    goals: Goals
};

export type DocumentationFull = {[key: string]: Documentation};
