import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import Dashboard from "../components/Dashboard";
import Authenticated from "../components/Authenticated";
import HomePage from "../components/HomePage";
import MessagePage from "../components/MessagePage";
import ContactPage from "../components/ContactPage";
import Logout from "../components/Logout";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/signup" component={SignupForm} exact={true} />
        <Route path="/signin" component={LoginForm} />

        <Authenticated>
          <Route path="/contact" component={ContactPage} />
          <Route path="/message" component={MessagePage} />
          <Route path="/account" component={Dashboard} />
          <Route path="/logout" component={Logout} />
        </Authenticated>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
