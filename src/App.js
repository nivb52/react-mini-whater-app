import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {AppHeader } from './cmps/AppHeader'
import './assets/main.css'
import './assets/style/main.scss'
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';

function App() {
  return (
    <div className="content-wrapper">
      <AppHeader/>
      <Switch>
        <Route path="/favorites" component={ Favorites } />
        <Route path="/" component={ Home } />
      </Switch>
    </div>
  );
}

export default App;
