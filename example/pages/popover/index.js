import React from 'react';
import {Popover,Button} from 'b-rc-m';
import Page from '../../component/page';
import './popover.less';

export default class extends React.Component {

  render() {
    return (
      <Page className="button" title="Popover" subTitle="Popover">
        <div className="btn-container">

          <Popover
            className="my-class"                // Optional: A class name to be added to the popover
            toggleButton={<Button>Foo</Button>} // Required: The element that will toggle the popover. Does not have to be a button.
            // Optional:
            horizontalJustify="left"
          >
            <div className="mi-popover-item" value="scan" data-seed="logId">
              <div className="mi-popover-item-container">
                <span className="mi-popover-item-content">扫一扫</span>
              </div>
            </div>
            <div className="mi-popover-item" value="special">
              <div className="mi-popover-item-container">
                <span className="mi-popover-item-content">我的二维码</span>
              </div>
            </div>
            <div className="mi-popover-item" value="button ct">
              <div className="mi-popover-item-container">
                  <span className="mi-popover-item-content">
                      <span>帮助</span>
                    </span>
              </div>
            </div>
          </Popover>

          <Popover
            className="my-class"                // Optional: A class name to be added to the popover
            toggleButton={<Button type="primary">Foo</Button>} // Required: The element that will toggle the popover. Does not have to be a button.
            // Optional:
            horizontalJustify="right"
          >
            <div className="mi-popover-item" value="scan" data-seed="logId">
              <div className="mi-popover-item-container">
                <span className="mi-popover-item-content">扫一扫</span>
              </div>
            </div>
            <div className="mi-popover-item" value="special">
              <div className="mi-popover-item-container">
                <span className="mi-popover-item-content">我的二维码</span>
              </div>
            </div>
            <div className="mi-popover-item" value="button ct">
              <div className="mi-popover-item-container">
                  <span className="mi-popover-item-content">
                      <span>帮助</span>
                    </span>
              </div>
            </div>
          </Popover>
        </div>
      </Page>
    );
  }
};
