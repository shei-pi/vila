import  React, { Component } from  'react';
import { BrowserRouter } from  'react-router-dom';
import { Route } from  'react-router-dom';
// import { Route, Link } from  'react-router-dom';
import  SkopioChart  from  './components/SkopioChart';
import  './App.css';

const  BaseLayout  = () => (
      <div  style={{height:1500, width:960}} className="skopioChart">
          <Route  path="/"  exact  component={SkopioChart}  />
      </div> 
  )


class  App  extends  Component {

  render() {
      return (
      <BrowserRouter>
          <BaseLayout/>
      </BrowserRouter>
      );
  }
  }
  export  default  App;