import React from 'react';
import ReactDOM from 'react-dom';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router';
import FastClick from 'fastclick';
import "babel-polyfill";
import {Drawer, List, NavBar} from 'antd-mobile'
//import  '../dist/b-rc-m.css'
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
import './app.less'
import {menus} from './menus'
class App extends React.Component {

  constructor(props) {
    super(props)
    this.onOpenChange = this.onOpenChange.bind(this)
    this.state = {
      open: false,
      position: 'left',
    }
  }

  onOpenChange(isOpen) {
    console.log(isOpen, arguments);
    this.setState({open: !this.state.open});
  }

  render() {
    const sidebar = (
      <div>
        <div className="demo-drawer-home">
          <Link to="/">
            MiFanFan Mobile
          </Link>
        </div>
        {
          menus.map((menu, index) => (
            <List renderHeader={() => menu.name} key={index}>
              {
                menu.items.map((item, index) => {
                  return (
                    <List.Item
                      key={index}
                    >
                      <Link
                        to={item.to}
                      >
                        {item.label}
                      </Link>
                    </List.Item>
                  );
                })}
            </List>
          ))
        }
      </div>


    );
    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange,
    };
    return (
      <div style={{height: '100%'}}>
        <div className="demo-drawer-trigger">
          <NavBar iconName="bars" onLeftClick={this.onOpenChange}></NavBar>
        </div>
        <div className="demo-drawer-container">
          <Drawer
            className="my-drawer"
            sidebar={sidebar}
            dragHandleStyle={{display: 'none'}}
            contentStyle={{color: '#A6A6A6', textAlign: 'center'}}
            {...drawerProps}
          >
            {this.props.children}
          </Drawer>
        </div>
      </div>
    );
  }
}

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
