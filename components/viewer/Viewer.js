/**
 * Created by Freeman on 2016/12/29.
 */
import React, {Component, PropTypes} from 'react'
import Animate from 'rc-animate'
import classNames from 'classnames'
import {formatPage} from './_util'
class Viewer extends Component {
  constructor(props) {
    super(props)
    this.handleResize = this.handleResize.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleTouchCancel = this.handleTouchCancel.bind(this)
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)

    this.state = {
      index: props.startIndex,
      showViewer: false,
      dragging: false,//是否单指滑动
      zooming: false,//是否放大
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      originX: '50%',
      originY: '50%',
      scale: 1,
      screenWidth: 0,
      screenHeight: 0,
      delta:0,
    }
  }

  componentWillMount() {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    })
  }

  handleItemClick(index) {
    this.setState({
      index: index,
      showViewer: true
    })
  }

  handleBack() {
    this.setState({
      showViewer: false
    })
  }

  handleTouchStart(e) {
    e.preventDefault()
    if (e.touches.length > 1) {
      this.setState({
        zooming: true,
      })
      return
    }
    this.setState({
      dragging: true,
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
    })
    this.handleTouchMove(e)
  }

  handleTouchMove(e) {
    e.preventDefault()

    if (e.touches.length > 1) {
      this.setState({
        delta:Math.abs(e.touches[0].pageX-e.touches[1].pageX)
      })
      return
    }
    this.setState({
      endX: e.touches[0].clientX,
      endY: e.touches[0].clientY,
    })
  }

  handleTouchEnd(e) {
    e.preventDefault()
    if (e.touches.length > 1) {

      return
    }
    let diff = 0
    let distance = this.state.endX - this.state.startX
    if (distance > 0) {
      diff = -1
    } else if (distance < 0) {
      diff = 1
    }

    let index = this.state.index + diff
    if (index === this.props.data.length) {
      index = this.props.data.length - 1
    }
    if (index === -1) {
      index = 0
    }
    this.setState({
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      index: index,
      dragging: false
    })
  }

  handleTouchCancel(e) {

  }

  handleZoomIn(e) {
    this.setState({
      zooming: true,
    })
  }

  handleZoomOut(e) {
    this.setState({
      zooming: false,
    })
  }

  render() {
    const {prefixCls, data} = this.props;

    const width = this.state.screenWidth;
    const height = this.state.screenHeight - 40;
    let imgListTranslate = -(this.state.index * width)
    if (this.state.dragging){
      imgListTranslate += this.state.endX - this.state.startX
    }
    const durate = this.state.dragging ? 0 : .3;
    const imgListStyle = {
      width: width * data.length,
      transition: 'transform .3s ease-out',
      WebkitTransition: `transform ${durate}s ease-out`,
      transform: `translate3d(${imgListTranslate}px,0px,0px)`
    };
    const imgStyle = {
      width: width,
      transition: 'all .3s ease-out',
      WebkitTransition: `all ${durate}s ease-out`,
      transformOrigin: `${this.state.originX} ${this.state.originY} 0px`,
      WebkitTransformOrigin: `${this.state.originX} ${this.state.originY} 0px`,
      transform: `scale3d(${this.state.scale},${this.state.scale},1)`
    }
    return (
      <div className="">
        <div className={classNames('mi-viewer-img-list',{'display-none':this.state.showViewer})}>
          <ul className="mi-viewer-img-container">
            {
              data.map((url, index) => (
                <li key={index} className="mi-viewer-img-item" onClick={() => this.handleItemClick(index)}>
                  <img src={url} role="presentation" />
                </li>
              ))
            }
          </ul>
        </div>
        {
          this.state.showViewer &&
          <Animate component="" transitionName="slide-right">

            <div className="mi-viewer-overlay">
              <div className="mi-view-wrap">
                <div className="mi-viewer-toolbar">
                  <div className="mi-viewer-toolbar-back">
                    <a href="javascript:;" onClick={this.handleBack}>〈</a>
                  </div>
                  {this.state.delta}
                  <div className="mi-viewer-toolbar-page">
                    <span className="mi-viewer-toolbar-page-current">{formatPage(this.state.index + 1)}</span>
                    <span>/</span>
                    <span className="mi-viewer-toolbar-page-total">{formatPage(data.length)}</span>
                  </div>
                </div>
                <div className="mi-viewer-view">
                  <div className="mi-viewer-imgbox"
                       ref="imgBox"
                       onTouchStart={this.handleTouchStart}
                       onTouchMove={this.handleTouchMove}
                       onTouchEnd={this.handleTouchEnd}
                       onTouchCancel={this.handleTouchCancel}
                  >
                    <ul className="mi-viewer-imglist" style={imgListStyle}>
                      {
                        data.map((url, index) => (
                          <li key={index} style={{width: width, height: height}}>
                            <img
                              src={url}
                              role="presentation"
                              style={imgStyle}
                            />
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Animate>
        }
      </div>
    )
  }
}
Viewer.propTypes = {
  prefixCls: PropTypes.string,
  startIndex: PropTypes.number,//
  direction: PropTypes.string,//direction
  closeFunction: PropTypes.func,//close callback Function
  data: PropTypes.array.isRequired,//images data
}

Viewer.defaultProps = {
  startIndex: 0,
  direction: 'left',
  prefixCls: 'mi-viewer'
}

export default Viewer
