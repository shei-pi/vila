import  React, { Component } from  'react';

import SkopioService from './SkopioService';

const skopioService = new SkopioService();

class  DeviceData  extends  Component {

    constructor(props) {
        super(props);
        this.state  = {
            device_data: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }
    componentDidMount() {
        var  self  =  this;
        skopioService.getDevicesData().then(function (result) {
            self.setState({ device_data:  result.data, nextPageURL:  result.nextlink})
        });
    }
    handleDelete(e,pk){
        var  self  =  this;
        skopioService.deleteCustomer({pk :  pk}).then(()=>{
            var  newArr  =  self.state.customers.filter(function(obj) {
                return  obj.pk  !==  pk;
            });
            self.setState({customers:  newArr})
        });
    }
    nextPage(){
        var  self  =  this;
        skopioService.getDevicesDataByURL(this.state.nextPageURL).then((result) => {
            self.setState({ device_data:  result.data, nextPageURL:  result.nextlink})
        });
    }
render() {

    return (
    <div  className="devicedata--list">
        <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Timestamp</th>
                <th>Moisture</th>
                <th>Humidity</th>
                <th>Temperature</th>
            </tr>
            </thead>
            <tbody>
                {this.state.device_data.map( dd  =>
                <tr  key={dd.pk}>
                    <td>{dd.pk}  </td>
                    <td>{dd.timestamp}</td>
                    <td>{dd.moisture}</td>
                    <td>{dd.humidity}</td>
                    <td>{dd.temperature}</td>
                    <td>
                    <button  onClick={(e)=>  this.handleDelete(e,dd.pk) }> Delete</button>
                    <a  href={"/device_data/" + dd.pk}> Update</a>
                    </td>
                </tr>)}
            </tbody>
        </table>
        <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
    </div>
    );
}
}
export  default  DeviceData;