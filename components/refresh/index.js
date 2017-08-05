/**
 * Created by strong on 2017/8/4.
 */
import React,{Component} from 'react'
import PropTypes from 'prop-types'

export default class Refresh extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moveDistance: 0,
      isLoading: false,
    }
    this.body = null
    this.refresh = null
    this.startY = 0
    this.moveY = 0
    this.distance = 0
    this.bodyClientHeight = 0
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.loading = this.loading.bind(this)
  }
  handleTouchStart(event) {
    this.startY = event.touches[0].clientY
  }
  handleTouchMove(event) {
    this.distance = event.touches[0].clientY - this.startY
    if(this.distance < 0 || this.state.loading) {
      // event.stopPropagation()
      // event.preventDefault()
      return
    }
    this.moveY = event.touches[0].clientY
    this.setState({
      moveDistance: this.distance < 0 ? 0 : this.distance
    })
  }
  handleTouchEnd(event) {
    if(this.distance < 0 || this.state.loading) {
      event.stopPropagation()
      event.preventDefault()
      return
    }
    this.setState({
      isLoading: true,
    })
    this.loading()
  }
  loading() {
    const {onRefresh} = this.props
    new Promise((resolve, reject) => {
      onRefresh(resolve, reject)
    }).then(()=>{
      this.setState({
        moveDistance: 0,
        isLoading: false
      })
    })
  }
  render() {
    const {children, icon, loading, ...rest} = this.props
    return (
      <div
        ref={(body) => {this.body = body}} {...rest}
        className={this.state.isLoading && 'refresh-loading'}>
        <div ref="ptr" className="ptr-element">
          {icon || <span className="genericon genericon-next"/>}
          {loading ||
          <div className="loading">
            <span className="loading-ptr-1" />
            <span className="loading-ptr-2" />
            <span className="loading-ptr-3" />
          </div>}
        </div>
        <div
          style={{transform: `translate3d(0,${this.state.moveDistance}px,0)`}}
          ref={(refresh) => {this.refresh = refresh}}
          className="refresh-view"
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          {children}
        </div>
      </div>
    )
  }
}
