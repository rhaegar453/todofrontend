import React from "react";
import { Route, Switch } from "react-router-dom";
import ToDo from "./ToDo/ToDo";
import Navigation from "./Navigation/Navigation";
import SignIn from "./Authentication/SignIn";
import Register from "./Authentication/Register";

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <div style={{marginTop:"70px"}}>
        <Switch>
          <Route path="/" exact component={ToDo}/>
          <Route path="/login" exact component={SignIn}/>
          <Route path="/register" exact component={Register}/>
        </Switch>
        </div>
      </div>
    );
  }
}

export default Layout;
