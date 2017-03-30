/**
 * Created by Freeman on 2017/3/30.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import FastClick from 'fastclick';
import "babel-polyfill";
import App from './app';
import Home from './pages/home/index';
import Button from './pages/button/index';
import Icons from './pages/icons/index';
import Viewer from './pages/viewer/index';
import Swipe from './pages/swipe/index';
import Toaster from './pages/toaster/index';
import Progress from './pages/progress';
import NavBarPage from './pages/nav-bar';
import FlexPage from './pages/flex';
import GridPage from './pages/grid';
import LoadingPage from './pages/loading';



window.addEventListener('load', () => {
  FastClick.attach(document.body);
});

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="button" component={Button}/>
      <Route path="icons" component={Icons}/>
      <Route path="viewer" component={Viewer}/>
      <Route path="swipe" component={Swipe}/>
      <Route path="toaster" component={Toaster}/>
      <Route path="progress" component={Progress}/>
      <Route path="nav-bar" component={NavBarPage}/>
      <Route path="flex" component={FlexPage}/>
      <Route path="grid" component={GridPage}/>
      <Route path="loading" component={LoadingPage}/>
    </Route>
  </Router>
), document.getElementById('container'));
