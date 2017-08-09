/**
 * Created by strong on 2017/8/4.
 */
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Refresh extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moveDistance: 0,
      isLoading: false,
      bodyHeight: 0
    }
    this.body = null
    this.startY = 0
    this.distance = 0
    this.isLoading = false
    this.animation = null
    this.startScrollTop = 0
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.loading = this.loading.bind(this)
  }
  componentDidMount() {
    this.setState({
      bodyHeight: document.documentElement.clientHeight - this.body.getBoundingClientRect().top
    })
  }
  handleTouchStart(event) {
    this.startY = event.touches[0].clientY
    this.startScrollTop = this.body.scrollTop
  }
  handleTouchMove(event) {
    const resistance = this.props.resistance
    this.distance = (event.touches[0].clientY - this.startY) / resistance
    if (this.isLoading || this.distance < 0  || this.body.scrollTop) {
      return
    }
    this.setState({
        moveDistance: this.distance
    })

  }
  handleTouchEnd(event) {
    if (this.distance > 70 && !this.body.scrollTop && !this.startScrollTop && !this.isLoading) {
      this.setState({
        isLoading: true,
        moveDistance: 0,
      })
      this.isLoading = true
      this.loading()
    }else {
      this.setState({
        moveDistance: 0,
      })
    }
  }
  loading() {
    const {onRefresh} = this.props
    new Promise((resolve, reject) => {
      onRefresh(resolve, reject)
    }).then(()=>{
      this.isLoading = false
      this.setState({
        isLoading: false,
        moveDistance: 0,
      })
    })
  }
  render() {
    const {children, loading, prefixCls} = this.props,
      bodyStyle = {height: `${this.state.bodyHeight}px`, overflow: 'scroll', position: 'relative'},
      moveStyle = {transform: `translate3d(0,${this.state.moveDistance}px,0)`}
    return (
      <div
        ref={body => this.body = body}
        className={classNames({[`${prefixCls}-refresh-loading`]: this.state.isLoading})}
        style={bodyStyle}
      >
        <div ref={animation => this.animation = animation} className={`${prefixCls}-ptr-element`} style={moveStyle}>
          <span className={`${prefixCls}-genericon ${prefixCls}-genericon-next`}/>
          {loading ||
          <div className={`${prefixCls}-loading`}>
            <span className={`${prefixCls}-loading-ptr-1`} />
            <span className={`${prefixCls}-loading-ptr-2`} />
            <span className={`${prefixCls}-loading-ptr-3`} />
          </div>}
        </div>
        <div
          style={moveStyle}
          className={`${prefixCls}-refresh-view`}
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

Refresh.propTypes = {
  resistance: PropTypes.number,
  loading: PropTypes.object,
  prefixCls: PropTypes.string,
}

Refresh.defaultProps = {
  resistance: 2.5,
  prefixCls: 'mi-refresh'
}

