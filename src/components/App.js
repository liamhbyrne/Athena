import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import { NavigationBar}  from './NavigationBar';
import Profile from "./Profile";
import Home from "./Home";
import CreateTask from "./CreateTask";
import SkillsChooser from "./SkillsChooser"

// Main App
function App() {
  return (
    <>
    {/* Puts the NavigationBar componenet on the top of the screen */}
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute component={NavigationBar} />
        </Switch>
      </Router>
    </AuthProvider>

    {/* The components in this block are designed to take up the entire page */}
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </AuthProvider>
    </Router>

    {/* The components in this block are designed to only take up a small section of the page */}
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/create-task" component={CreateTask} />
              <PrivateRoute path="/skills" component={SkillsChooser} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>

      </div>
    </Container>
    </>
  )
}

export default App