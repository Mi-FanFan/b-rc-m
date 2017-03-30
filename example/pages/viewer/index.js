import React from 'react';
import Page from '../../component/page';
import Viewer from '../../../components/viewer';
import '../../../components/viewer/style';
import './viewer.less';
const data = [
  'http://static.budee.com/yyren/image/14/3761.jpg?w=1200',
  'http://static.budee.com/yyren/image/14/3761.jpg?w=1200',
  'http://static.budee.com/yyren/image/244/5/390212.jpg?w=1200',
  'http://static.budee.com/yyren/image/244/5/390212.jpg?w=1200',
  'http://static.budee.com/yyren/image/244/5/390212.jpg?w=1200',
  'http://static.budee.com/yyren/image/244/5/390212.jpg?w=1200',
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
