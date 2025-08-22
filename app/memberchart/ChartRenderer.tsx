"use client";

import React from "react";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export type ChartConfig = {
    categories: {category: string}[],
    chartData: Record<string, {category: string, count: number}[]>,
};

export default class ChartRenderer extends React.Component<{chartConfig: ChartConfig}, any> {

    componentDidMount() {
        // Create root:
        am5.registry.rootElements.forEach(r => {
            if (r.dom.id !== "chart") return;
            r.dispose();
        });
        const root = am5.Root.new("chart");

        root.setThemes([
            am5themes_Animated.new(root),
            am5themes_Dark.new(root)
        ]);

        // Create chart:
        const chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panXY",
            wheelY: "zoomXY",
            pinchZoomX: true
        }));

        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
        }));

        const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none"
        }));
        cursor.lineY.set("visible", false);

        const {chartConfig: {categories, chartData}} = this.props;

        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "category",
            renderer: am5xy.AxisRendererX.new(root, {pan: "zoom"})
        }));
        xAxis.data.setAll(categories);

        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {pan: "zoom"})
        }));

        // Set chart data:
        for (const [name, data] of Object.entries(chartData)) {
            const series = chart.series.push(am5xy.LineSeries.new(root, {
                name, xAxis, yAxis,
                visible: false,
                valueYField: "count",
                categoryXField: "category",
                tooltip: am5.Tooltip.new(root, {labelHTML: `<div style='text-align: center'>{name}<br>{categoryX}<br>{valueY} members</div>`})
            }));

            series.data.setAll(data);

            series.bullets.push(() => {
                const sprite = am5.Circle.new(root, {radius: 5, fill: series.get("fill")});
                return am5.Bullet.new(root, {sprite});
            });

            series.strokes.template.setAll({
                strokeWidth: 3
            });

            series.fills.template.setAll({
                fillOpacity: 0.1,
                visible: true
            });
        }

        // Set legend:
        const legend = chart.rightAxesContainer.children.push(am5.Legend.new(root, {
            width: 200,
            paddingLeft: 15,
            height: am5.p100
        }));

        legend.itemContainers.template.set("width", am5.p100);
        legend.valueLabels.template.setAll({
            width: am5.p100,
            textAlign: "right"
        });

        legend.data.setAll(chart.series.values);

        chart.appear(1000, 100).then();
    }

    render() {
        return (
            <div id="chart" style={{"width": "100%", "height": "500px"}} />
        );
    }

}
