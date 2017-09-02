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
      bodyHeight: 0,
      showTop: false,
      moveDistance: 0,
      isLoading: false,
    }
    this.startY = 0
    this.body = null
    this.distance = 0
    this.items = null
    this.isLoading = false
    this.animation = null
    this.startScrollTop = 0
    this.goToTop = this.goToTop.bind(this)
    this.loading = this.loading.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
  }
  componentDidMount() {
    this.setState({
      bodyHeight: document.documentElement.clientHeight - this.body.getBoundingClientRect().top
    })
    const body = document.getElementsByTagName('body')[0]
    body.style.height = '100%'
    body.style.overflow = 'hidden'
    this.items.addEventListener('touchmove', this.handleTouchMove, false)
    this.items.addEventListener('touchstart', this.handleTouchStart, false)
    this.items.addEventListener('touchend', this.handleTouchEnd, false)
    this.body.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    this.body.removeEventListener('scroll', this.handleScroll)
  }
  handleTouchStart(e) {
    e.stopPropagation()
    this.startY = e.touches[0].clientY
    this.startScrollTop = this.body.scrollTop
  }
  handleTouchMove(e) {
    const resistance = this.props.resistance
    this.distance = (e.touches[0].clientY - this.startY) / resistance
    if (this.isLoading || this.distance < 0  || this.body.scrollTop) {
      e.stopPropagation() //在正常上划浏览数据时，不会禁止document的touchmove事件。
      return
    }
    this.setState({
      moveDistance: this.distance
    })
  }
  handleTouchEnd(event) {
    const {distanceToRefresh} = this.props
    if (this.distance > distanceToRefresh && !this.body.scrollTop && !this.startScrollTop && !this.isLoading) {
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
  handleCancelMove(e) {
    e.preventDefault()
  }
  loading() {
    const {onRefresh} = this.props
    new Promise((resolve, reject) => {
      onRefresh(resolve, reject)
    }).then(()=>{
      this.distance = 0
      this.isLoading = false
      this.setState({
        moveDistance: 0,
        isLoading: false,
      })
    })
  }
  goToTop() {
    this.body.scrollTop = 0
  }
  handleScroll() {
    if(this.body.scrollTop > 100) {
      this.setState({showTop: true})
    }else {
      this.setState({showTop: false})
    }
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
          ref={items => this.items = items}
        >
          {children}
        </div>
        <div>
          {
            this.state.showTop && <div className={`${prefixCls}-goto_top`} onClick={this.goToTop} />
          }
        </div>
      </div>
    )
  }
}

Refresh.propTypes = {
  loading: PropTypes.object,
  prefixCls: PropTypes.string,
  resistance: PropTypes.number,
  distanceToRefresh: PropTypes.number,
}

Refresh.defaultProps = {
  resistance: 2.5,
  prefixCls: 'mi-refresh',
  distanceToRefresh: 100,
}

