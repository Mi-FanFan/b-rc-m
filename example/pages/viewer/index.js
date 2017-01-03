import React from 'react';
import Page from '../../component/page';
import Viewer from '../../../components/viewer';
import './viewer.less';
const data = [
  'http://7jpp73.com1.z0.glb.clouddn.com/M_1.jpg',
  'http://7jpp73.com1.z0.glb.clouddn.com/M_2.jpg',
  'http://7jpp73.com1.z0.glb.clouddn.com/M_3.jpg',
  'http://7jpp73.com1.z0.glb.clouddn.com/M_4.jpg',
  'http://7jpp73.com1.z0.glb.clouddn.com/M_5.jpg',
  'http://7jpp73.com1.z0.glb.clouddn.com/M_6.jpg',
]
export default class ViewerDemo extends React.Component {

    render() {
        return (
            <Page className="viewer" title="Viewer" subTitle="Viewer" spacing>
              <div>
                <Viewer data={data} />
              </div>
            </Page>
        );
    }
};
