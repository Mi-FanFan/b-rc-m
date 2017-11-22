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
    this.passiveSupported = false //判断是否支持addEventlistener 的 passive属性。
  }
  componentDidMount() {
    const {scrollTargetSelector, defaultScrollTop} = this.props,
      self = this

    this.setState({
      bodyHeight: document.documentElement.clientHeight - this.body.getBoundingClientRect().top
    })
    //处理body元素，并且绑定滚动事件
    this.realBody = this.getScrollTarget(scrollTargetSelector)
    this.realBody.scrollTop = defaultScrollTop
    this.realBody.addEventListener('scroll', this.handleScroll)
    document.addEventListener('scroll', ()=>{console.log(document.body.scrollTop)})
    /*
     * 使用原生事件绑定方式，主要是因为react独特的事件绑定方式。
     * react 会把事件绑定到document上面，这样就无法在第一时间禁止掉document的touchmove事件，导致页面下滑刷新整个页面。
     * 如果没有在第一时间将document的touchmove禁止掉，就会发生如下warning：
     * Ignored attempt to cancel a touchmove event with cancelable=false, for example because scrolling is in progress and cannot be interrupted.
    */

    this.items.addEventListener('touchmove', this.handleTouchMove, false)
    this.items.addEventListener('touchstart', this.handleTouchStart, false)
    this.items.addEventListener('touchend', this.handleTouchEnd, false)

    //判断 addEventListener('test', null, {passive: false}) 绑定方式是否支持。
    //主要是兼容uc浏览器
    try {
      const options = Object.defineProperty({}, "passive", {
        get: function() {
          self.passiveSupported = true;
        }
      });
      window.addEventListener("test", null, options);
    } catch(err) {
      alert(err)
    }
  }
  /**
   *
   * 处理在网页的轮动条滚动时，改变监控的滚动条对象。
   */
  componentWillReceiveProps({scrollTargetSelector}) {
    const {defaultScrollTop} = this.props

    if(scrollTargetSelector !== this.props.scrollTargetSelector) {
      //重新设定body的高度。
      this.setState({
        bodyHeight: document.documentElement.clientHeight - this.body.getBoundingClientRect().top
      })

      //在绑定之前先将之前realbody的绑定事件去掉
      this.realBody.removeEventListener('scroll', this.handleScroll)
      //处理新的realbody
      this.realBody = this.getScrollTarget(scrollTargetSelector)
      this.realBody.scrollTop = defaultScrollTop
      this.realBody.addEventListener('scroll', this.handleScroll)
    }
  }
  componentWillUnmount() {
    this.realBody.removeEventListener('scroll', this.handleScroll)
    !this.browserIsUc && document.removeEventListener('touchmove', this.handleCancelMove)
    window.REFRESH_DEFAULT_SCROLL_TOP = this.realBody.scrollTop
  }
  handleTouchStart = (e)  => {
    const {operationCallback} = this.props
    e.stopPropagation()

    this.startY = e.touches[0].clientY
    this.startScrollTop = this.body.scrollTop

    // 当触碰到整个组件的时候，调用回调函数
    if(operationCallback && typeof operationCallback !== 'function') {
      throw new Error('handleScrollToZero must be a function')
    }
    operationCallback && operationCallback()
  }
  handleTouchMove = (e) => {
    const resistance = this.props.resistance
    this.distance = (e.touches[0].clientY - this.startY) / resistance
    if (this.isLoading || this.distance < 0  || this.getRealBodyScrollTop()) {
      e.stopPropagation() //在正常上划浏览数据时，不会禁止document的touchmove事件。
      return
    }
    this.setState({
      moveDistance: this.distance
    })
    document.addEventListener('touchmove', this.handleCancelMove, this.passiveSupported ? {passive: false} : false)
  }
  handleTouchEnd = (event) => {
    const {distanceToRefresh} = this.props
    if (this.distance > distanceToRefresh && !this.getRealBodyScrollTop() && !this.startScrollTop && !this.isLoading) {
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
    document.removeEventListener('touchmove', this.handleCancelMove)
  }
  handleCancelMove = (e) => {
    e.preventDefault()
  }
  loading = async () => {
    const {onRefresh} = this.props
    await new Promise((resolve, reject) => {onRefresh(resolve, reject)})
    this.distance = 0
    this.isLoading = false
    this.setState({
      moveDistance: 0,
      isLoading: false,
    })
  }
  goToTop = () => {
    this.realBody.scrollTop = 0
  }
  handleScroll = () => {
    const {handleScrollToZero} = this.props

    if(handleScrollToZero && typeof handleScrollToZero !== 'function') {
      throw new Error('handleScrollToZero must be a function')
    }

    handleScrollToZero && handleScrollToZero()

    if(this.realBody.scrollTop > 100) {
      this.setState({showTop: true})
    }else {
      this.setState({showTop: false})
    }
  }
  /**
   * 类似于jquery的元素选择器，
   * @param {String} target
   */
  getScrollTarget = (target) => {
    return !target
      ? this.body
      : target === 'document'
      ? document
      : target === 'body'
      ? document.body
      : document.querySelector(target)
  }
  /**
   * 返回指定dom的滚动条高度
   */
  getRealBodyScrollTop = () => {
    //chrome一众浏览器获取滚动条高度通过document.documentElement而uc浏览器是通过document.body获取
    return this.realBody === document ? (document.documentElement.scrollTop || document.body.scrollTop): this.realBody.scrollTop
  }
  render() {
    const {children, loading, prefixCls, isShowGotoTop, GotoTop} = this.props,
      bodyStyle = {
        ...(this.realBody === document ? {} : { height:`${this.state.bodyHeight}px`}),
        overflow: 'scroll',
        position: 'relative'},
        moveStyle = {transform: `translate3d(0,${this.state.moveDistance}px,0)`
      }
    return (
      <div
        ref={body => this.body = body}
        className={classNames(`${prefixCls}-body`,{[`${prefixCls}-refresh-loading`]: this.state.isLoading})}
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

