/**
 * Created by strong on 2017/8/5.
 */
import React,{Component} from 'react'
import {Refresh} from 'b-rc-m'

export default class RefreshExam extends Component{
  constructor(props) {
    super(props)
    this.handleRefresh = this.handleRefresh.bind(this)
  }
  getDefaultProps() {

  }
  handleRefresh(resolve, reject) {
    setTimeout(()=>{
      resolve()
      console.log('loading 结束')
    },1000)
  }
  render() {
    return (
      <div>
        <Refresh
          onRefresh={this.handleRefresh}
          style={{
            textAlign: 'center'
          }}
        >
          <h3>Pull down to refresh</h3>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
          <div>adfasdfsdfds</div>
        </Refresh>
      </div>
    )
  }
}

