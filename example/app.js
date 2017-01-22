import React from 'react';
import ReactDOM from 'react-dom';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import FastClick from 'fastclick';
import "babel-polyfill";
import {Drawer, List, NavBar} from 'antd-mobile'
//import  '../components/style/index.less'
import Pages from './index';
const {Home, Button, Icons, Viewer, Swipe, Toaster} = Pages;
import './app.less'

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
    const sidebar = (<List>
      {[...Array(20).keys()].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
                             thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                             multipleLine
          >分类</List.Item>);
        }
        return (<List.Item key={index}
                           thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >分类{index}</List.Item>);
      })}
    </List>);
    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange,
    };
    return (
      <div style={{height: '100%'}}>
        <div className="demo-drawer-trigger">
          <NavBar iconName="bars" onLeftClick={this.onOpenChange}>头</NavBar>
        </div>
        <div className="demo-drawer-container">
          <Drawer
            className="my-drawer"
            sidebar={sidebar}
            dragHandleStyle={{display: 'none'}}
            contentStyle={{color: '#A6A6A6', textAlign: 'center', paddingTop: 42}}
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
    </Route>
  </Router>
), document.getElementById('container'));
