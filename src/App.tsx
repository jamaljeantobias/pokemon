import React from "react";
import { Home } from "../src/components/home";
import { Project } from "../src/components/project";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "../src/styles/main.css";

function App(props: any) {
  return (
    <React.Fragment>
      <div className="main">
        <Router>
          <div>
            <Switch>
              <Route  exact path="/">
                <Home />
              </Route>
              <Route exact path="/project/:id" component={Project}>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </React.Fragment>
  );
}

export default App;
