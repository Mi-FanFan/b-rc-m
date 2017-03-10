import React from 'react';
import {WhiteSpace} from 'antd-mobile'
import {Progress} from '.././../../';
import Page from '../../component/page';
import './progress.less';

export default class extends React.Component {

  render() {
    return (
      <Page className="button" title="Progress" subTitle="进度条">
        <div className="demo-title">
          应用场景示例
        </div>
        <div className="progress-container">
          <Progress position="fixed" percent={30} style={{border: '1px solid red'}}/>
          <Progress percent={30}/>
          <WhiteSpace/>
          <Progress percent={40} unfilled="hide"/>
          <div className="show-info">
            <div className="progress">
              <Progress percent={40} color="red"/>
            </div>
            <div>40%</div>
          </div>
        </div>
      </Page>
    );
  }
};
