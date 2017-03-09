import React from 'react';
import {Flex} from 'antd-mobile';
import {Link} from 'react-router';
import Page from '../../component/page';

import './index.less';



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
