import  React, { Component } from  'react';

import ReactDOM from 'react-dom';
import * as V from 'victory';
import {VictoryChart, VictoryLine, VictoryScatter, VictoryTheme, VictoryAxis} from 'victory';
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
    componentDidMount() {
        var  self  =  this;
        skopioService.getDevicesDataByURL("http://192.168.1.44:8000/ambiente/device_data/?device_id=31416&from_dt=2020-08-21 12:18&to_dt=2020-08-22").then(function (result) {
            console.log(result)
            self.setState({ device_data:  result.results, nextPageURL:  result.next});
        });
    }
    // handleDelete(e,pk){
    //     var  self  =  this;
    //     skopioService.deleteCustomer({pk :  pk}).then(()=>{
    //         var  newArr  =  self.state.customers.filter(function(obj) {
    //             return  obj.pk  !==  pk;
    //         });
    //         self.setState({customers:  newArr})
    //     });
    // }
    // nextPage(){
    //     var  self  =  this;
    //     skopioService.getDevicesDataByURL(this.state.nextPageURL).then((result) => {
    //         self.setState({ device_data:  result.results, nextPageURL:  result.next})
    //     });
    //}
    getDateFromISO(iso_string){
        var iso_date = new Date(iso_string);
        return iso_date
    }
    getDatetimeTickers(data, ts_tag, num_of_ticks=10){
        //get an array of tickers equally divided
        var tickers = [];
        var step = data.length/num_of_ticks;        
        var i;
        var init_date = new Date(data[0][ts_tag]);
        var end_date = new Date(data[data.length-1][ts_tag]);


        var diff =(end_date.getTime() - init_date.getTime()) / 1000;
        diff /= 60.0;
        if (diff<60){
            console.log('short span')
            for (i = 0; i < num_of_ticks; i++) {
                var tick=new Date(data[i*step][ts_tag]);
                tickers.push(tick.getMinutes());
            }
        }else if (diff<60*24) {
            console.log('medium span')
            for (i = 0; i < num_of_ticks; i++) {
                var tick=new Date(data[i*step][ts_tag]);
                var m=tick.getMinutes();
                var h=tick.getMinutes();
                tickers.push(`${h}:${m}`);
            }
        }else {
            console.log('Big span')
            for (i = 0; i < num_of_ticks; i++) {
                var tick=new Date(data[i*step][ts_tag]);
                tickers.push(tick.getDay());
            }
        }      
    
       
        console.log("tickers",tickers);
        return tickers;
    }
    render() {
        if (this.state.device_data === undefined || this.state.device_data.length == 0){
            return (<div></div>)
        }
        const styles = this.getStyles();
        const tickValues = this.getDatetimeTickers(this.state.device_data, "timestamp");

        return (
            
          <div>
            <VictoryChart style={styles} viewBox="0 0 100 100">
            <VictoryAxis
            scale="time"
            standalone={false}
            style={styles.axisYears}
            tickValues={tickValues}
            // tickFormat={
            //   (x) => {
            //     if (x.getFullYear() === 2000) {
            //       return x.getFullYear();
            //     }
            //     if (x.getFullYear() % 5 === 0) {
            //       return x.getFullYear().toString().slice(2);
            //     }
            //   }
            // }
          />
            <VictoryLine
                style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
                }}
                interpolation={this.state.interpolation} data={this.state.device_data}
                style={{ data: { stroke: "#c43a31" } }}
                x="timestamp"
                y="humidity"
                scale={{x: "time", y: "linear"}}

              />
              <VictoryLine
                style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
                }}
                interpolation="monotoneX"
                data={this.state.device_data}
                style={{ data: { stroke: "#c43a31" } }}
                x="timestamp"
                y="temperature"
                scale={{x: "time", y: "linear"}}

              />
              <VictoryLine
                style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
                }}
                interpolation="monotoneX"
                data={this.state.device_data}
                style={{ data: { stroke: "#c43a31" } }}
                x="timestamp"
                y="moisture"
                scale={{x: "time", y: "linear"}}

              />
            </VictoryChart>
          </div>
        );
      }
        
    getStyles() {
        const BLUE_COLOR = "#00a3de";
        const RED_COLOR = "#7c270b";

        return {
        parent: {
            background: "#ccdee8",
            boxSizing: "border-box",
            display: "inline",
            padding: 0,
            fontFamily: "'Fira Sans', sans-serif"
        },
        title: {
            textAnchor: "start",
            verticalAnchor: "end",
            fill: "#000000",
            fontFamily: "inherit",
            fontSize: "18px",
            fontWeight: "bold"
        },
        labelNumber: {
            textAnchor: "middle",
            fill: "#ffffff",
            fontFamily: "inherit",
            fontSize: "14px"
        },

        // INDEPENDENT AXIS
        axisYears: {
            axis: { stroke: "black", strokeWidth: 1},
            ticks: {
            size: ({ tick }) => {
                const tickSize = 5;
                return tickSize;
            },
            stroke: "black",
            strokeWidth: 1
            },
            tickLabels: {
            fill: "black",
            fontFamily: "inherit",
            fontSize: 16
            }
        },

        // DATA SET ONE
        axisOne: {
            grid: {
            stroke: ({ tick }) =>
                tick === -10 ? "transparent" : "#ffffff",
            strokeWidth: 2
            },
            axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
            ticks: { strokeWidth: 0 },
            tickLabels: {
            fill: BLUE_COLOR,
            fontFamily: "inherit",
            fontSize: 16
            }
        },
        labelOne: {
            fill: BLUE_COLOR,
            fontFamily: "inherit",
            fontSize: 12,
            fontStyle: "italic"
        },
        lineOne: {
            data: { stroke: BLUE_COLOR, strokeWidth: 4.5 }
        },
        axisOneCustomLabel: {
            fill: BLUE_COLOR,
            fontFamily: "inherit",
            fontWeight: 300,
            fontSize: 21
        },

        // DATA SET TWO
        axisTwo: {
            axis: { stroke: RED_COLOR, strokeWidth: 0 },
            tickLabels: {
            fill: RED_COLOR,
            fontFamily: "inherit",
            fontSize: 16
            }
        },
        labelTwo: {
            textAnchor: "end",
            fill: RED_COLOR,
            fontFamily: "inherit",
            fontSize: 12,
            fontStyle: "italic"
        },
        lineTwo: {
            data: { stroke: RED_COLOR, strokeWidth: 4.5 }
        },

        // HORIZONTAL LINE
        lineThree: {
            data: { stroke: "#e95f46", strokeWidth: 2 }
        }
        };
    }
}
export  default  DeviceDataChart;