import React from 'react'
import { WhiteSpace } from 'antd-mobile'
import {Loading} from 'b-rc-m'
import Page from '../../component/page'
import './loading.less'

export default class extends React.Component {

  render () {
    return (
      <Page className="loading" title="Loading" subTitle="Loading">
        <div className="demo-title">
          应用场景示例
        </div>
        <div className="loading-container">
          <Loading />

          <WhiteSpace/>

          <div className="show-info">
            <div className="loading">
              <Loading />
            </div>
          </div>
        </div>
      </Page>
    )
  }
}
