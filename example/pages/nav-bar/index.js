import React from 'react';
import {NavBar, Icon} from '.././../../components';
import Page from '../../component/page';
import './nav-bar.less';

export default class extends React.Component {

  render() {
    return (
      <Page className="button" title="NavBar" subTitle="导航栏">
        <div className="btn-container">
          <div className="demo-title">
            NavBar
          </div>
          <NavBar
            leftContent="返回"
            mode="light"
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={[<Icon key="0" type="search"/>, <Icon key="1" type="ellipsis"/>]}
          >
            NavBar
          </NavBar>
        </div>
      </Page>
    );
  }
};
