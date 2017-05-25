import React from 'react';
import {WhiteSpace} from 'antd-mobile'
import {Flex} from 'b-rc-m';
import Page from '../../component/page';
import './flex.less';

const PlaceHolder = props => (
  <div className="placeHolder" {...props}>Item</div>
);

export default class FlexDemo extends React.Component {

  render() {
    return (
      <Page className="flex" title="Flex" subTitle="Flex">
        <div className="flex-container">
          <div className="sub-title">基本</div>
          <Flex>
            <Flex.Item><PlaceHolder /></Flex.Item>
            <Flex.Item><PlaceHolder /></Flex.Item>
          </Flex>
          <WhiteSpace size="lg" />
          <Flex>
            <Flex.Item><PlaceHolder /></Flex.Item>
            <Flex.Item><PlaceHolder /></Flex.Item>
            <Flex.Item><PlaceHolder /></Flex.Item>
          </Flex>
          <WhiteSpace size="lg" />
          <Flex>
            <Flex.Item><PlaceHolder /></Flex.Item>
            <Flex.Item><PlaceHolder /></Flex.Item>
            <Flex.Item><PlaceHolder /></Flex.Item>
            <Flex.Item><PlaceHolder /></Flex.Item>
          </Flex>
          <WhiteSpace size="lg" />

          <div className="sub-title">wrap 换行</div>
          <Flex wrap="wrap">
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline" />
          </Flex>
          <WhiteSpace size="lg" />

          <div className="sub-title">轴对齐方式</div>
          <Flex justify="center">
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline" />
          </Flex>
          <WhiteSpace />
          <Flex justify="end">
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline" />
          </Flex>
          <WhiteSpace />
          <Flex justify="between">
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline" />
          </Flex>

          <WhiteSpace />
          <Flex align="start">
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline small" />
            <PlaceHolder className="inline" />
          </Flex>
          <WhiteSpace />
          <Flex align="end">
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline small" />
            <PlaceHolder className="inline" />
          </Flex>
          <WhiteSpace />
          <Flex align="baseline">
            <PlaceHolder className="inline" />
            <PlaceHolder className="inline small" />
            <PlaceHolder className="inline" />
          </Flex>
        </div>
      </Page>
    );
  }
};
