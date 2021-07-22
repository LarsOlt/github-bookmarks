import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import { Home } from "./sites/Home";
import { GlobalStyles } from "./global-styles";

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DndProvider backend={HTML5Backend}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Redirect to="/" />
            </Switch>
          </DndProvider>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
