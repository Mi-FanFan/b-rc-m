import React from 'react';
import NavBar from '../../../components/nav-bar';
import  '../../../components/nav-bar/style';
import Icon from '../../../components/icon';
import '../../../components/icon/style';
import Page from '../../component/page';
import './nav-bar.less';

export default class extends React.Component {

  render() {
    return (
      <Page className="button" title="NavBar" subTitle="导航栏">
        <div className="btn-container">
          <NavBar
            leftContent="返回"
            mode="light"
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={[<Icon key="0" type="search"/>, <Icon key="1" type="ellipsis"/>]}
          >
            NavBar
          </NavBar>
          <NavBar
            showBack={false}
            mode="light"
            rightContent={[<Icon key="0" type="search"/>, <Icon key="1" type="ellipsis"/>]}
          >
            NavBar
          </NavBar>
          <NavBar
            iconName={false}
            leftContent={<img src="http://cdn.mifanfan.cn/mifan/img/m_logo.jpg" alt="logo" style={{height:'35px'}}/>}
            mode="light"
            rightContent={[<Icon key="0" type="search"/>, <Icon key="1" type="ellipsis"/>]}
          >
            NavBar
          </NavBar>
        </div>
      </Page>
    );
  }
};
