import React from "react";
import { Header, Main } from "components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Posts, Post, Create, Edit } from "views";

function App() {
  return (
    <Router>
      <Header />
      <Main>
        <Switch>
          <Route path="/" component={Posts} />
          <Route path="/post/:id" component={Post} />
          <Route path="/create" component={Create} />
          <Route path="/edit/:id" component={Edit} />
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
