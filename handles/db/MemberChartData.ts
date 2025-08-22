import {InferAttributes, InferCreationAttributes} from "sequelize";

import {Column, DataType, Model, Table} from "sequelize-typescript";

import type {ChartConfig} from "../../app/memberchart/ChartRenderer";

@Table({
    timestamps: false,
    modelName: "MiniScriptE",
    tableName: "MiniScriptEs",
})
export class MiniScriptE extends Model<InferAttributes<MiniScriptE>, InferCreationAttributes<MiniScriptE>> {

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.INTEGER)
    declare count: number;

    @Column(DataType.DATE)
    declare date: Date;

    @Column(DataType.STRING)
    declare shortDate: string;

}

export default async function memberChartData() {
    const chartConfig: ChartConfig = {categories: [], chartData: {}};
    const categories: string[] = [];

    for (const data of (await MiniScriptE.findAll({order: [["date", "ASC"]]}))) {
        if (!categories.includes(data.shortDate)) categories.push(data.shortDate);

        chartConfig.chartData[data.name] ??= [];
        chartConfig.chartData[data.name].push({category: data.shortDate, count: data.count});
    }

    chartConfig.categories = categories.map(category => ({category}));
    return chartConfig;
}
