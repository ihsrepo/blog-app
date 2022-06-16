import React from "react";
import { Navbar, Layout } from "components";
import { Login, Users } from "views";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-100 h-full">
      <Navbar />
      <Layout>
        <Router>
          <Switch>
            <Route path="/" component={Login} />
            <Route path="/users" component={Users} />
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
