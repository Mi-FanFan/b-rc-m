import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';
import FastClick from 'fastclick';
import 'weui';
import "babel-polyfill";
import  '../components/style/index.less'
import Pages from './index';
const { Home, Button, Icons, Viewer,Swipe} = Pages;


class App extends React.Component {
        render() {
                return (
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="page"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        style={{height: '100%'}}
                    >
                            {React.cloneElement(this.props.children, {
                                    key: this.props.location.pathname
                            })}
                    </ReactCSSTransitionGroup>
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
            </Route>
    </Router>
), document.getElementById('container'));
