import React, { Component } from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import { settings } from "../portfolio.js";
import Home from "../pages/home/HomeComponent";
import Splash from "../pages/splash/Splash";
import Quiz from "../pages/quiz/Quiz";

export default class Main extends Component {
  render() {
    const theme = this.props.theme;
    console.log("Theme", theme);
    if (settings.isSplash) {
      return (
        <div>
          <HashRouter basename="/">
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => (
                  <Splash {...props} theme={this.props.theme} />
                )}
              />
              <Route
                path="/home"
                render={(props) => <Home {...props} theme={this.props.theme} />}
              />
              <Route
                path="/splash"
                render={(props) => (
                  <Splash {...props} theme={this.props.theme} />
                )}
              />
            </Switch>
          </HashRouter>
        </div>
      );
    } else {
      return (
        <div>
          <HashRouter basename="/">
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => <Home {...props} theme={this.props.theme} />}
              />
              <Route
                path="/home"
                render={(props) => <Home {...props} theme={this.props.theme} />}
              />
              <Route
                path="/quiz"
                render={(props) => <Quiz {...props} theme={this.props.theme} />}
              />
              <Route
                path="/quiz-test"
                render={(props) => (
                  <QuizTest {...props} theme={this.props.theme} />
                )}
              />
            </Switch>
          </HashRouter>
        </div>
      );
    }
  }
}