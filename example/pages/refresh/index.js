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
    this.state = {
      target: false
    }
  }
  handleRefresh(resolve, reject) {
    setTimeout(()=>{
      resolve()
    },1000)
  }
  componentDidMount() {
    this.setState({
      target: '#app'
    })
  }
  handleOperation() {
    console.log('operation')
  }
  handleClick() {
    console.log('click')
  }
  render() {
    return (
      <div onClick={this.handleClick}>
        <button onClick={()=>this.setState({target: !this.state.target})} >切换目标</button>
        <Refresh
          onRefresh={this.handleRefresh}
          distanceToRefresh={document.documentElement.clientHeight / 10}
          isShowGotoTop={true}
          operationCallback={this.handleOperation}
          defaultScrollTop={window.REFRESH_DEFAULT_SCROLL_TOP}
          scrollTargetSelector={this.state.target}
          isRefresh={false}
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

