/**
 * Created by Freeman on 2017/8/3.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Mask from '../mask'
import omit from 'lodash/omit'
export default class Popup extends Component {

  static propTypes = {
        /**
     * display the component
     *
     */
    show: PropTypes.bool,
    onCancel:PropTypes.func,
  }

  static defaultProps = {
    show: false,
  }

  constructor (props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      closing: false
    }
  }

  handleClose (cb) {
    this.setState({
      closing: true
    }, () => setTimeout(() => {
      this.setState({closing: false})
      cb()
    }, 300))
  }


  render () {

    const {className, show, onCancel,children} = this.props
    const others = omit(this.props,'className','show')
    const maskCls = classNames({
      'mi-animate-fade-in': show && !this.state.closing,
      'mi-animate-fade-out': this.state.closing,
    })
    const popupCls = classNames(
      'mi-popup', {
        'mi-animate-slide-up': show && !this.state.closing,
        'mi-animate-slide-down': this.state.closing
      }, className)

    return (
      show &&
        <div>
          <Mask className={maskCls} onClick={e => this.handleClose(() => {if (onCancel) onCancel(e)})}/>
          <div className={popupCls} {...others}>
            {children}
          </div>
        </div>
    )
  }
}
