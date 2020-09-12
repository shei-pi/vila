import React, { Component, useEffect, useRef } from 'react';

import SkopioService from '../SkopioService';

import { Line } from 'react-chartjs-2';

export function useInterval(callback, delay){
    const savedCallback = useRef();
    useEffect(()=>{
        savedCallback.cuurent = callback;        
    }, [callback]);
    useEffect(()=>{
        function tick() {
            savedCallback.current();
        }
        if (delay!=null){
            const id = setInterval(tick,delay);
            return ()=>{
                clearInterval(id);
            };
        }
    },[callback, delay]);
}
const skopioService = new SkopioService();

class DeviceDataChart extends Component {

    constructor(props) {
        super(props);
        this.state = {            
            device_data: [],
            chartData: {
                labels: [],
                datasets:[
                    {
                        label:'Temperature',
                        data:[21.5,22,23,25,26,27,321,15],
                    },
                ]
            },
            nextPageURL: '',
        };
        // this.nextPage  =  this.nextPage.bind(this);
        // this.handleDelete  =  this.handleDelete.bind(this);
        this.myRef = React.createRef();
    }
    
    componentDidMount() {
        var self = this;
        skopioService.getDevicesDataByURL("http://192.168.1.44:8000/ambiente/device_data/?device_id=31416&from_dt=2020-09-01 12:18&to_dt=2020-09-14").then(function (result) {
            console.log(result)
            self.setState({ device_data: result.results, nextPageURL: result.next });
            self.drawChart();
        });
        useInterval(async ()=>{
        console.log('Polleando nueva data');
        }, 3000);
    }
    drawChart() {
        this.setState({chartData: this.transformDeviceDataToChart(this.device_data)})        
        console.log(this.state.chartData)        
       }
    
    chartRef = React.createRef();

    extractStateData(tag) {
        let result = this.state.device_data.map(a => a[tag]);        
        return result;
    }
    transformDeviceDataToChart(device_data){
        console.log(device_data);
        let temps = this.extractStateData('temperature');
        let humidity = this.extractStateData('humidity');
        let ts_labels = this.extractStateData('timestamp').map(a=> new Date(a));
        let chart_data = {labels: ts_labels,
            datasets:[
                {
                    label:'Temperature',
                    data:temps,
                    borderColor: 'rgba(48, 131, 106, 0.781)',
                    backgroundColor: 'rgba(48, 131, 106, 0.5)'
                },
                {
                    label:'Humidity',
                    data:humidity,
                    borderColor: 'rgb(150, 119, 19)',
                    backgroundColor: 'rgba(150, 119, 19,0.3)'
                }
            ]
        }
        return chart_data
    }
    chartOptions = {
        title:{
            display:true,
            text: 'Temperature 1st',
            fontSize:35
        },
        legend:{
            display:true,
            position:'right'
        },
        scales: {        
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'minute'
                }
            }]
            
        }
    }

    render() {
        return (
            <div className="deviceDataChart">
            <Line
                data={this.state.chartData}
                options={this.chartOptions}
            />
            </div>
        )
    }

}
export default DeviceDataChart;