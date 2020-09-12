import  React, { Component } from  'react';

import Chart from "chart.js";
import classes from "./LineGraph.module.css";
import SkopioService from '../SkopioService';

const skopioService = new SkopioService();

class  DeviceDataChart  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            device_data: [],
            nextPageURL:  '',
            interpolation: "linear",
            polar: false
          };
        // this.nextPage  =  this.nextPage.bind(this);
        // this.handleDelete  =  this.handleDelete.bind(this);
        this.myRef = React.createRef();
    }
    chartRef = React.createRef();
    getTimeLabels(){
        var labels=[];
        this.state.device_data.forEach(function(datum){
            labels.push(new Date(datum.timestamp));
        })
        return labels;
    }
    extractStateData(tag){
        
        let result = this.state.device_data.map(a => a[tag]);
        console.log(result,tag)
        return result;
    }
    componentDidMount() {
        var  self  =  this;
        skopioService.getDevicesDataByURL("http://192.168.1.44:8000/ambiente/device_data/?device_id=31416&from_dt=2020-08-21 12:18&to_dt=2020-08-22").then(function (result) {
            console.log(result)
            self.setState({ device_data:  result.results, nextPageURL:  result.next});
            self.drawChart();
        });
    }
    drawChart(){
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: "line",
            // labels: this.getTimeLabels(),
            data: {
                datasets: [
                    {
                        data: this.extractStateData('temperature')
                    },
                    {

            fillColor             : "rgba(151,187,205,0.2)",
            strokeColor           : "rgba(151,187,205,1)",
            pointColor            : "rgba(151,187,205,1)",
            pointStrokeColor      : "#fff",
            pointHighlightFill    : "#fff",
            pointHighlightStroke  : "rgba(151,187,205,1)",
                        data: this.extractStateData('humidity')
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        type: 'time',
               
                    }]
                }
            }
        });
    }
    render() {
        return (
            <div className={classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
        
}
export  default  DeviceDataChart;