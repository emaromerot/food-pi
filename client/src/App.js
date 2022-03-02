import './App.css';
import {BrowserRouter,Route,Switch} from "react-router-dom"
import React from 'react';
import { ReactDOM } from 'react';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import RecipeCreate from './components/RecipeCreate';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path= "/" component={LandingPage} />
      <Route exact path= "/home" component={Home}/>
      <Route exact path={"/detail/:id"}   component={Detail}/> 
      <Route path={"/recipes"} component={RecipeCreate}/>
      </Switch>
    </div>
   
    </BrowserRouter>
  );
}

export default App;
