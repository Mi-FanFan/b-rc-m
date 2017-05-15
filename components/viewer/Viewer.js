/**
 * Created by Freeman on 2016/12/29.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Animate from 'rc-animate'
import classNames from 'classnames'
import {formatPage} from './_util'
class Viewer extends Component {
  constructor(props) {
    super(props)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleTouchCancel = this.handleTouchCancel.bind(this)
    this.handleImgTouchStart = this.handleImgTouchStart.bind(this)
    this.handleImgTouchEnd = this.handleImgTouchEnd.bind(this)
    this.handleImgTouchMove = this.handleImgTouchMove.bind(this)
    this.preDistance = 0
    this.state = {
      index: props.startIndex,
      showViewer: false,
      dragging:false,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      top: '0px',
      left: '0px',
      width: 0,
      height: 0,
      enlargeX: 0,
      enlargeY: 0,
      imgStartX: 0,
      imgStartY: 0,
      imgEndX: 0,
      imgEndY: 0,
      imgPreLeft: 0,
      imgPreTop: 0,
      firstIdentifier: 0,
      direction: 0,    //图片放大滑动过边界，判断方向1为向左，2为向右，0为保持原位置。
    }
  }

  componentDidMount() {
    this.setState({
      width: document.documentElement.clientWidth,
      height: "auto"
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
    if( e.touches.length > 1){
      return
    }
    this.setState({
      dragging:true,
      startX:e.touches[0].clientX,
      startY:e.touches[0].clientY,
    })
    this.handleTouchMove(e)
  }

  handleTouchMove(e) {
    e.preventDefault()
    if (e.touches.length > 1) {
      return
    }
    this.setState({
      endX:e.touches[0].clientX,
      endY:e.touches[0].clientY,
    })
  }
  componentDidUpdate() {
    const {data} = this.props
    if(this.refs['div0'].style.height && parseInt(this.refs['div0'].style.height,10) !== 0 ) return

    for(let i = 0 ; i < data.length; i++) {
      this.refs[`div${i}`].style.height = this.refs[`img${i}`].offsetHeight + 'px'
      this.refs[`div${i}`].style.width = this.refs[`img${i}`].offsetWidth + 'px'
    }
  }
  handleTouchEnd(e) {
    e.preventDefault()
    if (e.touches.length > 1) {
      return
    }
    let diff  = 0
    let distance = this.state.endX -this.state.startX
    if (distance>0){
      diff = -1
    }else if (distance<0){
      diff = 1
    }

    let index = this.state.index + diff
    if (index === this.props.data.length){
      index = this.props.data.length-1
    }
    if (index === -1){
      index = 0
    }
    this.setState({
      startX:0,
      startY:0,
      endX:0,
      endY:0,
      index:index,
      dragging:false,
    })
  }

  handleTouchCancel(e) {

  }
  handleImgTouchStart(e) {
    if (e.touches.length > 1) {
      this.preDistance = Math.pow((e.touches[1].clientX - e.touches[0].clientX), 2) + Math.pow((e.touches[1].clientY - e.touches[0].clientY), 2)
    }else {
      this.setState({
        imgStartX: e.touches[0].clientX,
        imgStartY: e.touches[0].clientY,
        imgPreLeft: this.state.left,    //避免图片移动，重复添加距离。
        imgPreTop: this.state.top,
        firstIdentifier: e.touches[0].identifier,
      })
    }
  }

  handleImgTouchMove(e) {
    e.stopPropagation()
    e.preventDefault()
    if(e.touches.length === 2){
      e.stopPropagation()
      let distance = Math.pow((e.touches[1].clientX - e.touches[0].clientX),2) + Math.pow((e.touches[1].clientY-e.touches[0].clientY),2)
      //放大
      if(this.preDistance < distance){

        if(parseFloat(this.state.width) > parseFloat(document.documentElement.clientWidth * 2.5)){return}
        let width = parseFloat(this.state.width) * 1.04  +'px',
          height = parseFloat(this.refs['img'+this.state.index].offsetHeight) * 1.04 + 'px',
          k = parseFloat(width) / document.documentElement.clientWidth,
          X = (e.touches[0].clientX + e.touches[1].clientX) / 2,
          Y = (e.touches[0].clientY + e.touches[1].clientY - 500 )  /  2,
          top = (1-k) * Y + 'px',
          left = (1-k) * X + 'px'
        this.setState({
          top,
          left,
          width,
          height,
          enlargeY: Y,
          enlargeX: X,
          imgStartX: e.touches[0].clientX,
          imgStartY: e.touches[0].clientY,
          imgPreTop: top,
          imgPreLeft: left,
        })
      }
      //缩小
      else if(this.preDistance > distance ){
        if(parseFloat(this.refs['img'+this.state.index].style.width) < parseFloat(this.refs.li0.style.width)){
          return
        }
        let width = parseFloat(this.refs['img'+this.state.index].style.width) / 1.04 + 'px'
        let height = parseFloat(this.refs['img'+this.state.index].offsetHeight) / 1.04 + 'px'
        let k = parseFloat(width) / document.documentElement.clientWidth,
          top = (1-k) * this.state.enlargeY + 'px',
          left = (1-k) * this.state.enlargeX + 'px'

        this.setState({
          top,
          left,
          width,
          height,
          imgStartX: e.touches[0].clientX,
          imgStartY: e.touches[0].clientY,
          imgPreTop: top,
          imgPreLeft: left,
        })
      }
      this.preDistance = distance
    }
    //单指拖动图片
    else if(e.touches.length === 1) {
      //图片被放大，可以拖动
      if(e.touches[0].identifier !== this.state.firstIdentifier) {return}
      if (parseFloat(this.refs['img' + this.state.index].style.width) > document.documentElement.clientWidth) { //图片放大拖动
        if (e.touches[0].clientX === this.state.imgEndX && e.touches[0].clientY === this.state.imgEndY) {
          return
        }
        let width = document.documentElement.clientWidth
        let imgMoveDistanceX = e.touches[0].clientX - this.state.imgStartX
        let imgMoveDistanceY = e.touches[0].clientY - this.state.imgStartY
        let imgLeft = parseFloat(this.state.imgPreLeft) + imgMoveDistanceX * 1.5

        if (imgLeft > 0) {
          this.setState({
            startX: 0,
            startY: 0,
            endX: imgLeft,
            endY: 0,
            left: "0px",
          })
          if(imgLeft > width/2) {
            this.setState({
              direction: this.state.index ? 1 : 0,
            })
          }
          imgLeft = 0
        }
        else if (imgLeft < -(parseFloat(this.refs['img' + this.state.index].style.width) - width)) {
          this.setState({
            startX: 0,
            startY: 0,
            endX: imgLeft + (parseFloat(this.refs['img' + this.state.index].style.width) - width),
            endY: 0,
            left: -(parseFloat(this.refs['img' + this.state.index].style.width) - width),
          })
          if((imgLeft + (parseFloat(this.refs['img' + this.state.index].style.width) - width) < -width/2)) {
            this.setState({
              direction: this.props.data.length - 1 === this.state.index ?  0 : 2
            })

          }

          imgLeft = -(parseFloat(this.refs['img' + this.state.index].style.width) - width)
        }
        let imgTop = parseFloat(this.state.imgPreTop) + imgMoveDistanceY * 1.5
        if (imgTop > 0) {
          imgTop = 0
        } else if (imgTop < -(parseFloat(this.refs['img' + this.state.index].style.height) - parseFloat(this.refs[`div${this.state.index}`].offsetHeight))) {
          imgTop = -(parseFloat(this.refs['img' + this.state.index].style.height) - parseFloat(this.refs[`div${this.state.index}`].offsetHeight))
        }
        this.setState({
          top: imgTop + 'px',
          left: imgLeft + 'px',
          imgEndX: e.touches[0].clientX,
          imgEndY: e.touches[0].clientY,
        })
      }
      else if(parseInt(this.refs['img' + this.state.index].style.width,10) === document.documentElement.clientWidth){
        this.handleTouchMove(e)
      }else {
        return
      }

    }

  }

  handleImgTouchEnd(e) {
    let width = document.documentElement.clientWidth
    e.stopPropagation()
    if(parseFloat(this.refs['img'+this.state.index].style.width) < parseFloat(width)){
      let this_ = this
      setTimeout(()=>{
        this_.setState({
          top: '0px',
          left: '0px',
          width: width+'px',
          height: '100%',
          imgEndX: 0,
          imgEndY: 0,
        })
      },100)

    }
    else if(parseFloat(this.refs['img'+this.state.index].style.width) === parseFloat(width)){
      this.handleTouchEnd(e)
    }
    else {
      let index = this.state.index
      if(this.state.direction === 2) {
        index = this.state.index + 1
      }else if(this.state.direction === 1 ){
        index = this.state.index - 1
      }
      if(this.state.index !== index) {
        this.setState({
          top: '0px',
          left: '0px',
          width: width+'px',
          height: '100%',
          startX:0,
          startY:0,
          endX:0,
          endY:0,
          index:index,
          direction: 0,
        })
      }
      this.setState({
        startX:0,
        startY:0,
        endX:0,
        endY:0,
      })
    }


  }

  render() {
    const {prefixCls, data} = this.props;
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight - 40*window.devicePixelRatio;
    const leftTranslate = -(this.state.index * width) +(this.state.endX - this.state.startX)
    const durate = this.state.dragging? 0:.3;
    const imgListStyle = {
      width: width * data.length,
      transition: 'transform .3s ease-out',
      WebkitTransition: `all ${durate}s ease-out`,
      transform: `translate3d(${leftTranslate}px,0px,0px)`
    }
    const imgStyle = {
      transform: `translate3d(${this.state.left},${this.state.top},0px)`,
      height: this.state.height,
      width: this.state.width
    }
    return (
      <div className="">
        <div className="mi-viewer-img-list">
          <ul className="mi-viewer-img-container">
            {
              data.map((url, index) => (
                <li key={index} className="mi-viewer-img-item" onClick={() => this.handleItemClick(index)}>
                  <img src={url} role="presentation"/>
                </li>
              ))
            }
          </ul>
        </div>
          <Animate component="" transitionName="slide-right" >
            <div className={classNames('mi-viewer-overlay',{'display-none':!this.state.showViewer})}>
              <div className="mi-view-wrap">
                <div className="mi-viewer-toolbar">
                  <div className="mi-viewer-toolbar-back">
                    <a href="javascript:;" onClick={this.handleBack}>〈</a>
                  </div>
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
                       onTouchCancel={this.handleTouchCancel}>
                    <ul className="mi-viewer-imglist" style={imgListStyle}>
                      {
                        data.map((url, index) => (
                          <li key={index} ref={`li${index}`} style={{width,height}}>
                            <div className="mi-viewer-imgWrap" ref={`div${index}`}>
                              <img ref={`img${index}`} src={url} role="presentation"
                                   style={this.state.index === index ?imgStyle:{width}}
                                   onTouchStart={this.handleImgTouchStart}
                                   onTouchMove={this.handleImgTouchMove}
                                   onTouchEnd={this.handleImgTouchEnd}
                              />
                            </div>

                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Animate>
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
