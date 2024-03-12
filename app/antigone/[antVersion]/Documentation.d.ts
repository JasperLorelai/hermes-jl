type GoalData = {
    target: string,
    extends?: string,
    parameters: {
        type: string,
        name?: string,
        default?: string
    }[]
};

export type Documentation = {
    LivingEntityClass: string[],
    goals: {
        [key: string]: GoalData
    }
};

export type DocumentationFull = {[key: string]: Documentation};
