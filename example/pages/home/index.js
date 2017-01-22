import React from 'react';
import {Flex} from 'antd-mobile';
import {Link} from 'react-router';
import Page from '../../component/page';
import Accordion from '../../component/accordion';

import Logo from './images/logo.png';
import IconForm from './images/icon_nav_form.png';
import IconFeedback from './images/icon_nav_feedback.png';
import IconLayout from './images/icon_nav_layout.png';
//import IconNav from './images/icon_nav_nav.png';
//import IconSearch from './images/icon_nav_search.png';

import './index.less';

const menus = [
  {
    name: 'Form',
    icon: IconForm,
    items: [
      {
        label: 'Button',
        to: '/button'
      },
    ]
  },
  {
    name: 'Basic Components',
    icon: IconLayout,
    items: [
      {
        label: 'Viewer',
        to: '/viewer'
      },
      {
        label: 'Icons',
        to: '/icons'
      },
      {
        label: 'Progress',
        to: '/progress'
      },
      {
        label: 'Swipe',
        to: '/swipe'
      },
    ]
  },{
    name: 'Feedbacks',
    icon: IconFeedback,
    items: [
      {
        label: 'Toast',
        to: '/toaster'
      },
    ]
  },
]

const Home = (props) => {
  return (
    <Page>
      <section
        className="demo-home"
        style={{
          height:'1334px',
          overflowY:'scroll'
        }}
      >
        <div className="demo-home-hd">
          <div className="logo" style={{backgroundImage: 'url(&quot;https://zos.alipayobjects.com/rmsportal/wIjMDnsrDoPPcIV.png&quot;);'}}></div>
          <h1 className="demo-home-title">MiFanFan Mobile</h1>
          <h2 className="demo-home-subtitle">服务于MiFanFan无线业务的react组件</h2>
        </div>
        <div className="demo-home-bd">

        </div>
      </section>
    </Page>

  );
};

export default Home;
