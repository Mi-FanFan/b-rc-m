import React from 'react';
import {Tabs} from 'b-rc-m';
import {WhiteSpace} from 'antd-mobile';
import Page from '../../component/page';
import './tabs.less';
const TabPane = Tabs.TabPane;
function callback(key) {
  console.log('onChange', key);
}
function handleTabClick(key) {
  console.log('onTabClick', key);
}
export default class extends React.Component {

  render() {
    return (
      <Page className="button" title="Tabs " subTitle="标签页">
        <Tabs  onChange={callback} onTabClick={handleTabClick} hasTabHeader={false}>
          <TabPane tab="选项卡一" key="4">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              选项卡一内容
            </div>
          </TabPane>
          <TabPane tab="选项卡二" key="3">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              选项卡二内容
            </div>
          </TabPane>
          <TabPane tab="选项卡三" key="2">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              选项卡三内容
            </div>
          </TabPane>
          <TabPane tab="选项卡四" key="1">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              选项卡四内容
            </div>
          </TabPane>
        </Tabs>
        <WhiteSpace />
      </Page>
    );
  }
};
