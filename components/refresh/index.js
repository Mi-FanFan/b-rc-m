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
    this.body = null //组建内部的body
    this.distance = 0
    this.items = null
    this.realBody = null //经过处理后的body
    this.isLoading = false
    this.animation = null
    this.startScrollTop = 0
    this.browserIsUc = false
    this.goToTop = this.goToTop.bind(this)
    this.loading = this.loading.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
  }
  componentDidMount() {
    const {scrollTargetSelector, defaultScrollTop} = this.props
    this.browserIsUc = navigator.userAgent.indexOf('UCBrowser') !== -1
    this.setState({
      bodyHeight: document.documentElement.clientHeight - this.body.getBoundingClientRect().top
    })
    //兼容uc浏览器下滑刷新。
    if(this.browserIsUc) {
      const body = document.getElementsByTagName('body')[0]
      body.style.height = '100%'
      body.style.overflow = 'hidden'
    }
    //处理body元素，并且绑定滚动事件
    this.realBody = scrollTargetSelector ? document.querySelector(scrollTargetSelector) : this.body
    this.realBody.scrollTop = defaultScrollTop
    this.realBody.addEventListener('scroll', this.handleScroll)

    this.items.addEventListener('touchmove', this.handleTouchMove, false)
    this.items.addEventListener('touchstart', this.handleTouchStart, false)
    this.items.addEventListener('touchend', this.handleTouchEnd, false)
  }
  componentWillUnmount() {
    this.realBody.removeEventListener('scroll', this.handleScroll)
    !this.browserIsUc && document.removeEventListener('touchmove', this.handleCancelMove)
    window.REFRESH_DEFAULT_SCROLL_TOP = this.realBody.scrollTop
  }
  handleTouchStart(e) {
    const {operationCallback} = this.props
    e.stopPropagation()
    this.startY = e.touches[0].clientY
    this.startScrollTop = this.body.scrollTop
    operationCallback&&operationCallback()
  }
  handleTouchMove(e) {
    const resistance = this.props.resistance
    this.distance = (e.touches[0].clientY - this.startY) / resistance
    if (this.isLoading || this.distance < 0  || this.realBody.scrollTop) {
      e.stopPropagation() //在正常上划浏览数据时，不会禁止document的touchmove事件。
      return
    }
    this.setState({
      moveDistance: this.distance
    })
    !this.browserIsUc && document.addEventListener('touchmove', this.handleCancelMove, {passive: false})
  }
  handleTouchEnd(event) {
    const {distanceToRefresh} = this.props
    if (this.distance > distanceToRefresh && !this.realBody.scrollTop && !this.startScrollTop && !this.isLoading) {
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
      !this.browserIsUc && document.removeEventListener('touchmove', this.handleCancelMove, {passive: false})
    })
  }
  goToTop() {
    this.realBody.scrollTop = 0
  }
  handleScroll() {
    if(this.realBody.scrollTop > 100) {
      this.setState({showTop: true})
    }else {
      this.setState({showTop: false})
    }
  }
  render() {
    const {children, loading, prefixCls, isShowGotoTop, scrollTargetSelector, GotoTop} = this.props,
      bodyStyle = {height: `${this.state.bodyHeight}px`, overflow: 'scroll', position: 'relative'},
      moveStyle = {transform: `translate3d(0,${this.state.moveDistance}px,0)`}
      // console.log(isShowGotoTop && this.state.showTop && (gotoTop || <div className={`${prefixCls}-goto_top`} onClick={this.goToTop} />))
    return (
      <div
        ref={body => this.body = body}
        className={classNames({[`${prefixCls}-refresh-loading`]: this.state.isLoading})}
        style={scrollTargetSelector ? {} : bodyStyle}
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

            isShowGotoTop && this.state.showTop && <div onClick={this.goToTop}>
              {GotoTop || <div className={`${prefixCls}-goto_top`}  />}
            </div>
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
  isShowGotoTop: PropTypes.bool,
  operationCallback: PropTypes.func,
  defaultScrollTop: PropTypes.number,
  distanceToRefresh: PropTypes.number,
  scrollTargetSelector: PropTypes.string,
}

Refresh.defaultProps = {
  resistance: 2.5,
  defaultScrollTop: 0,
  isShowGotoTop: true,
  distanceToRefresh: 100,
  prefixCls: 'mi-refresh',
  scrollTargetSelector: '',
}

