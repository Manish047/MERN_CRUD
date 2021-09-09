import { Redirect, Route, Switch } from "react-router";

import Layout from "./hoc/Layout";
import EditUser from "./containers/Users/EditUser";
import AllUsers from "./containers/Users/AllUsers";

function App() {
  return (
    <div className="App">
      <Layout >
        <Switch>
          <Route path="/edit-user" exact component={EditUser} />
          <Route path="/edit-user/:userId" exact component={EditUser} />
          <Route path="/" exact component={AllUsers} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
