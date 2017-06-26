/**
 * Created by Freeman on 2017/6/26.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from '../utils/ReactHammer'
export default class Scroll extends Component {

  constructor (props) {
    super(props)

    this.onPan = this.onPan.bind(this)
    this.onPanStart = this.onPanStart.bind(this)
    this.onPanEnd = this.onPanEnd.bind(this)
    this.state = {
      panning:false,
      width:0,
      left:0,
      delta:0,
      transition:'none'
    }

  }

  onPanStart(){
    this.setState({
      panning:true
    })
  }

  onPan(ev){
    console.log(ev.deltaX)
    this.setState({
      delta:ev.deltaX,
    })
  }

  onPanEnd(ev){
    const {parentWidth} = this.props
    const maxLeft = this.hammer.domElement.clientWidth - parentWidth;
    let transition = 'none'
    let left = this.state.left + ev.deltaX
    if (left > 0){
      left = 0
      transition = 'all .5s cubic-bezier(0.25,0.1,0.25,1) 0ms'
    }else if (Math.abs(left) >  maxLeft){
      left = -maxLeft
      transition = 'all .5s cubic-bezier(0.25,0.1,0.25,1) 0ms'
    }

    this.setState({
      delta:0,
      left: left,
      transition:transition,
      panning:false,
    })
  }

  render () {
    const {children,hammerOptions} = this.props

    const direction = {
      vertical: true
    }

    const events = {
      onPanStart: this.onPanStart,
      onPan: this.onPan,
      onPanEnd: this.onPanEnd,
    }

    const hammerStyle = {
      transform:`translateX(${this.state.left + this.state.delta}px)`,
      transition: this.state.panning ? 'none': 'all .5s cubic-bezier(0.25,0.1,0.25,1) 0ms'
    }

    return (
        <Hammer
          {...events}
          {...direction}
          options={hammerOptions}
          ref={hammer => this.hammer = hammer}
          style={hammerStyle}
        >
          {children}
        </Hammer>
    )
  }
}

Scroll.defaultProps = {
  hammerOptions:{},
}
Scroll.propTypes = {
  hammerOptions:PropTypes.object,
  parentWidth:PropTypes.number.isRequired,
}
