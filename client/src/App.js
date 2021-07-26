import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import About from './components/About'
import Home from './components/Home'


const App = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
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
