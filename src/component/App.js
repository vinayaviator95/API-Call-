import React from "react";
import Page1 from "./page1";
import Page2 from "./page2";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Page1} />
        <Route exact path="/page2" component={Page2} />
      </Switch>
    </div>
  );
};

export default App;
