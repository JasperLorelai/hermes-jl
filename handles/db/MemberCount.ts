import {InferAttributes, InferCreationAttributes} from "sequelize";

import {Column, DataType, Model, Table} from "sequelize-typescript";

import type {ChartConfig} from "../../app/memberchart/ChartRenderer";

@Table({timestamps: false})
export default class MemberCount extends Model<InferAttributes<MemberCount>, InferCreationAttributes<MemberCount>> {

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.INTEGER)
    declare count: number;

    @Column(DataType.DATE)
    declare date: Date;

    @Column(DataType.STRING)
    declare shortDate: string;
    
    public static async chart() {
        const chartConfig: ChartConfig = {categories: [], chartData: {}};
        const categories: string[] = [];
        
        for (const data of (await MemberCount.findAll({order: [["date", "ASC"]]}))) {
            if (!categories.includes(data.shortDate)) categories.push(data.shortDate);
            
            chartConfig.chartData[data.name] ??= [];
            chartConfig.chartData[data.name].push({category: data.shortDate, count: data.count});
        }
        
        chartConfig.categories = categories.map(category => ({category}));
        return chartConfig;
    }
    
}
