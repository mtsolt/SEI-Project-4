import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import About from './components/About'
import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Survey from './components/survey/Survey'
import SingleSurvey from './components/survey/SingleSurvey'
import Sighting from './components/survey/Sightings'
import Map from './components/Map'
import AmphibianShow from './components/amphibian/AmphibianShow'


const App = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path = "/map">
          <Map />
        </Route>
        <Route path = "/amphibians/:pk/">
          <AmphibianShow />
        </Route>
        <Route path = "/sightings">
          <Sighting />
        </Route>
        <Route path = "/surveys/:pk/">
          <SingleSurvey />
        </Route>
        <Route path = "/survey">
          <Survey />
        </Route>
        <Route path = "/auth/register">
          <Register />
        </Route>
        <Route path = "/auth/login">
          <Login />
        </Route>
        <Route path = "/about">
          <About />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}



export default App
