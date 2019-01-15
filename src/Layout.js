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
        <Switch>
          <Route path="/" exact component={ToDo}/>
          <Route path="/login" exact component={SignIn}/>
          <Route path="/register" exact component={Register}/>
        </Switch>
      </div>
    );
  }
}

export default Layout;
