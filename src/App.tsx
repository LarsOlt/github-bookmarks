import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import Home from "./sites/Home";
import { GlobalStyles } from "./global-styles";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
