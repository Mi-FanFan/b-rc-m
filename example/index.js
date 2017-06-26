/**
 * Created by Freeman on 2017/3/30.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import FastClick from 'fastclick';
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
import PopoverPage from './pages/popover';
import TabsPage from './pages/tabs';
import ListViewPage from './pages/listview';
import InputNumberPage from './pages/inputnumber';
import PickerPage from './pages/picker';
import DatePickerPage from './pages/date-picker';
import ModalPage from './pages/modal';
import ScrollPage from './pages/scroll';



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
      <Route path="popover" component={PopoverPage}/>
      <Route path="tabs" component={TabsPage}/>
      <Route path="listview" component={ListViewPage}/>
      <Route path="input-number" component={InputNumberPage}/>
      <Route path="picker" component={PickerPage}/>
      <Route path="date-picker" component={DatePickerPage}/>
      <Route path="modal" component={ModalPage}/>
      <Route path="scroll" component={ScrollPage}/>
    </Route>
  </Router>
), document.getElementById('container'));
