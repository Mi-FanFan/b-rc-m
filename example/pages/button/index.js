import React from 'react';
import {Flex} from 'antd-mobile';
import {Button} from '.././../../components';
import Page from '../../component/page';
import './button.less';

export default class ButtonDemo extends React.Component {

  render() {
    return (
      <Page className="button" title="Button" subTitle="按钮">
        <div className="btn-container">
          <div className="btn-div">
            <Button className="btn" >默认按钮</Button>
            <Button className="btn" type="primary" >primary 按钮</Button>
            <Button className="btn" type="primary" disabled>disabled按钮</Button>
            <Button className="btn" type="warning">warning按钮</Button>
            <Button className="btn" loading>Loading按钮</Button>
            <Button className="btn" activeStyle={false}>无点击反馈</Button>
            <Button className="btn" activeStyle={{ backgroundColor: 'red' }}>自定义点击反馈 style</Button>
            <p style={{ margin: 10, color: '#999' }}>inline / small</p>
            <Flex style={{ marginBottom: '16px' }}>
              <Button inline style={{ marginRight: '8px' }}>inline</Button>
              <Button inline size="small">inline small</Button>
            </Flex>
          </div>
        </div>
      </Page>
    );
  }
};
