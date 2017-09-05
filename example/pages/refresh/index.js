/**
 * Created by strong on 2017/8/5.
 */
import 'babel-polyfill'
import {Refresh} from 'b-rc-m'
import React,{Component} from 'react'

export default class RefreshExam extends Component{
  constructor(props) {
    super(props)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.array = new Array(200).fill(1)
  }
  handleRefresh(resolve, reject) {
    setTimeout(()=>{
      resolve()
    },1000)
  }
  render() {
    return (
      <div>
        <Refresh
          onRefresh={this.handleRefresh}
          distanceToRefresh={document.documentElement.clientHeight / 10}
          isShowGotoTop={false}
          scrollTargetSelector=".am-drawer-content"
          style={{
            textAlign: 'center'
          }}
        >
          {
            this.array.map((value, index) => (
              <div key={index}>第{index}元素</div>
            ))
          }
        </Refresh>
      </div>
    )
  }
}

