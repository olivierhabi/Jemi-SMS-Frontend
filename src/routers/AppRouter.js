import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignupFormPage from "../components/SignupFormPage";
import LoginForm from "../components/LoginForm";
import Dashboard from "../components/Dashboard";
import Authenticated from "../components/Authenticated";
import HomePage from "../components/HomePage";
import MessagePage from "../components/MessagePage";
import ContactPage from "../components/ContactPage";
import Logout from "../components/Logout";
import AllContactPage from "../components/AllContactsPage";
import AllMessagePage from "../components/AllMessagePage";
import MessageOnePage from "../components/MessageOnePage";
import FooterPage from "../components/FooterPage";
import NavSidebar from "../components/NavSidebar";
import NavTopDashboard from "../components/NavTopDashboard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/signup" component={SignupFormPage} exact={true} />
          <Route path="/signin" component={LoginForm} />

          <body>
            <div class="wrapper">
              <NavSidebar />
              <div class="main">
                <NavTopDashboard />
                <main>
                  <Authenticated>
                    <Route path="/contact" component={ContactPage} />
                    <Route path="/contacts" component={AllContactPage} />
                    <Route path="/message" component={MessagePage} />
                    <Route path="/onemessage" component={MessageOnePage} />
                    <Route path="/messages" component={AllMessagePage} />
                    <Route path="/account" component={Dashboard} />
                    <Route path="/logout" component={Logout} />
                  </Authenticated>
                </main>
                <FooterPage />
              </div>
            </div>
          </body>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
