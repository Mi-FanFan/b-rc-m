import React from 'react';
import {Icon} from 'b-rc-m';
import Page from '../../component/page';
import './icons.less';

const icons = [
  'check', 'check-circle', 'check-circle-o',  'cross',   'cross-circle',
  'cross-circle-o',  'up', 'down', 'left', 'right',
  'ellipsis', 'loading', 'koubei-o', 'koubei','question-circle'
];

export default class IconDemo extends React.Component {

  render() {
    return (
      <Page className="icons" title="Icons" subTitle="图标" spacing>

        <div className="icon_sp_area">
          {
            icons.map((item) => (
              <span key={item} className="icon-item-wrap">
                <Icon type={item}/>
                <span className="icon-item">{item}</span>
              </span>
            ))
          }
        </div>

      </Page>
    );
  }
};
