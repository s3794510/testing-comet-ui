import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RtlLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import { Amplify } from "aws-amplify";
import config from "views/auth/signIn/config.json";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

const AppContext = createContext();

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

const App = () => {
  const [contextData, setContextData] = useState({});

  return (
    <AppContext.Provider value={{ contextData, setContextData }}>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <ThemeEditorProvider>
            <HashRouter>
              <Switch>
                <Route path={`/auth`} component={AuthLayout} />
                <Route path={`/admin`} component={AdminLayout} />
                <Route path={`/rtl`} component={RtlLayout} />
                <Redirect from="/" to="/admin" />
              </Switch>
            </HashRouter>
          </ThemeEditorProvider>
        </React.StrictMode>
      </ChakraProvider>
    </AppContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
