import React from 'react';
import {connect} from 'react-redux';
import Layout from './Layout';

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <Layout/>
      </div>
    );
  }
}