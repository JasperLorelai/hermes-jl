"use client";

import React from "react";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default class ChartRenderer extends React.Component<any, any> {

    componentDidMount() {
        const root = createRoot();
        setThemes(root);
        const chart = createChart(root);

        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "category",
            renderer: am5xy.AxisRendererX.new(root, {})
        }));
        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
        }));

        setData(root, chart, xAxis, yAxis, this.props.chartData || {});

        setLegend(root, chart);

        chart.appear(1000, 100).then();
    }

    render() {
        return (
            <div id="chart" style={{"width": "100%", "height": "500px"}} />
        );
    }

}

function createRoot() {
    am5.registry.rootElements.forEach(r => {
        if (r.dom.id !== "chart") return;
        r.dispose();
    });
    return am5.Root.new("chart");
}

function setThemes(root: am5.Root) {
    root.setThemes([
        am5themes_Animated.new(root),
        am5themes_Dark.new(root)
    ]);
}

function createChart(root: am5.Root) {
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

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    return chart;
}

function setData(root: am5.Root, chart: am5xy.XYChart, xAxis: any, yAxis: any, props: any) {
    for (let [server, chartData] of Object.entries(props)) {
        const series = chart.series.push(am5xy.LineSeries.new(root, {
            name: server,
            xAxis, yAxis,
            valueYField: "count",
            categoryXField: "category",
            tooltip: am5.Tooltip.new(root, {
                labelHTML: `
                    <div style='text-align: center'>
                        {name}<br>
                        {categoryX}<br>
                        {valueY} members
                    </div>`
            })
        }));

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

        series.on("visible", (visible, target) => {
            if (!visible) return;
            // Hide previously visible charts.
            chart.series.values.forEach(series => {
                if (series == target) return;
                series.hide().then();
            });
            // Set data again.
            // @ts-ignore
            const data: any[] = chartData || [];
            xAxis.data.setAll(data);
            series.data.setAll(data);
        });

        series.hide().then();
    }
}

function setLegend(root: am5.Root, chart: am5xy.XYChart) {
    let legend = chart.rightAxesContainer.children.push(am5.Legend.new(root, {
        width: 200,
        paddingLeft: 15,
        height: am5.percent(100)
    }));

    legend.itemContainers.template.set("width", am5.p100);
    legend.valueLabels.template.setAll({
        width: am5.p100,
        textAlign: "right"
    });

    legend.data.setAll(chart.series.values);
}
