import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';


export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <Navigation/>
        <Switch>
          <Route exact path="/" component={toDo}></Route>
          <Route path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
        </Switch>
      </div>
    );
  }
}