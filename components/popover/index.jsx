/**
 * Created by Freeman on 2017/5/9.
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
export default class Popover extends Component {

  constructor (props) {
    super(props)

    this.state = {
      topOffset: 0,
      leftOffset: 0,
      isOpen: props.isOpen || false
    }
  }

  componentWillReceiveProps (props) {
    if (props.isOpen !== this.state.isOpen) {
      this.setState({
        isOpen: props.isOpen
      })
    }
  }

  componentDidMount () {
    if (this.state.isOpen) {
      this.calculateDimensions()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.isOpen && this.state.isOpen !== prevState.isOpen) {
      this.calculateDimensions()
    }
  }

  globalClick = () => {
    if (this.props.isOpen) {
      if (this.props.isOpen !== this.state.isOpen) {
        this.setState({
          isOpen: this.props.isOpen
        })
      }
    } else {
      if (this.state.isOpen) {
        this.setState({
          isOpen: false
        })
      }
    }
  }

  handleClick = (ev) => {
    if (ev.stopImmediatePropagation) {
      ev.stopImmediatePropagation()
    } else {
      ev.nativeEvent.stopImmediatePropagation()
    }
  }

  toggleButton = (ev) => {
    if (ev.stopImmediatePropagation) {
      ev.stopImmediatePropagation()
    } else {
      ev.nativeEvent.stopImmediatePropagation()
    }

    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  calculateDimensions = () => {
    const toggleButton = ReactDOM.findDOMNode(this.toggleButtonrRef)
    const popover = ReactDOM.findDOMNode(this.popover)

    const buttonHeight = toggleButton.offsetHeight
    const buttonWidth = toggleButton.offsetWidth
    const popoverHeight = popover.offsetHeight
    const popoverWidth = popover.offsetWidth

    const topOffset = this.calculateTopOffset(popoverHeight, buttonHeight)
    const leftOffset = this.calculateLeftOffset(popoverWidth, buttonWidth)

    this.setState({
      popoverHeight,
      popoverWidth,
      topOffset,
      leftOffset
    })
  }

  calculateTopOffset (popoverHeight, buttonHeight) {
    const {position, topOffset} = this.props
    let offset = '0px'

    switch (position) {
      case 'top':
        offset = `-${popoverHeight + topOffset}`
        break
      case 'bottom':
        offset = buttonHeight + topOffset
        break
      case 'left':
        offset = topOffset
        break
      case 'right':
        offset = topOffset
        break
      default:
        offset = 0
    }

    return offset
  }

  calculateLeftOffset (popoverWidth, buttonWidth) {
    const {position, leftOffset} = this.props
    let offset = '0px'

    switch (position) {
      case 'top':
        offset = leftOffset
        break
      case 'bottom':
        offset = leftOffset
        break
      case 'left':
        offset = `-${popoverWidth + leftOffset}`
        break
      case 'right':
        offset = buttonWidth + leftOffset
        break
      default:
        offset = 0
    }
    return offset
  }

  renderButton = () => {
    const {toggleButton} = this.props
    if (toggleButton) {
      return React.cloneElement(toggleButton, {
        ref: ref => this.toggleButtonrRef = ref,
        onClick: toggleButton.props.onClick || this.toggleButton
      })
    }
    else {
      return (
        <div
          style={{display: 'none'}}
          onClick={this.toggleButton}
          ref={ref => this.toggleButtonrRef = ref}
        />
      )
    }
  }

  render () {
    const {prefixCls, horizontalJustify, position,children} = this.props

    let contentStyles = {top: this.state.topOffset}
    contentStyles[horizontalJustify] = this.state.leftOffset

    const popoverCls = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-placement-${position}-${horizontalJustify}`]: true,
      [`${prefixCls}-hidden`]: !this.state.isOpen,
    })
    const maskCls = classNames({
      [`${prefixCls}-mask`]: true,
      [`${prefixCls}-mask-hidden`]: !this.state.isOpen,
    })
    return (
      <div style={{position: 'relative'}}>
        {this.renderButton()}
        <div className={maskCls} onClick={this.globalClick}/>
        <div className={popoverCls} style={contentStyles} ref={ref => this.popover = ref}>
          <div className="mi-popover-content" onClick={this.handleClick}>
            <div className="mi-popover-arrow"/>
            <div className="mi-popover-inner">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Popover.defaultProps = {
  prefixCls: 'mi-popover',
  toggleButton: null,
  position: 'bottom',
  topOffset: 10,
  leftOffset: 0,
  horizontalJustify: 'left'
}
Popover.propTypes = {
  prefixCls: PropTypes.string,
  toggleButton: PropTypes.node,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  topOffset: PropTypes.number,
  leftOffset: PropTypes.number,
  horizontalJustify: PropTypes.oneOf(['left', 'right']),
}
