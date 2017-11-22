import React from 'react';
import {Link} from 'react-router';
import {Drawer, List, NavBar} from 'antd-mobile'
import './app.less'
import {menus} from './menus'
export default class App extends React.Component {

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

    // 在example的演示中，含有外面一层组件

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

    // 直接显示开发组件，不包含外面得包装组件。

    // return (
    //   <div>{this.props.children}</div>
    // )
  }
}

