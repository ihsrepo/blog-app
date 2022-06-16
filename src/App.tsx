import React from "react";
import { Header, Main } from "components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Posts, Post, Create, Edit } from "views";

function App() {
  return (
    <Router>
      <Main>
        <Header />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/edit/:id" component={Edit} />
          <Redirect path="*" to="/" />
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
