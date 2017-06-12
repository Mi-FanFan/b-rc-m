/**
 * Created by freeman on 17-6-12.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Mask from '../mask'
export default class Modal extends Component {

  static propTypes = {

    prefixCls: PropTypes.string,
    /**
     * array objects consists of groups for each scroll group
     *
     */
    className: PropTypes.string,
    /**
     * default group index thats selected, if not provide, automatic chose the best fiting item when mounted
     *
     */
    title: PropTypes.string,
    /**
     * trigger when individual group change, pass property(`item`, `item index in group`, `group index in groups`, `selected`, `picker instance`)
     *
     */
    footer: PropTypes.bool,
    /**
     * on selected change, pass property `selected` for array of slected index to `groups`
     *
     */
    show: PropTypes.bool,
    bodyStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    style: PropTypes.object,
    operation: PropTypes.bool,
  }

  static defaultProps = {
    prefixCls: 'mi-modal',
    show: false,
    bodyStyle: {},
    buttonStyle: {},
    style: {},
    operation: false,
  }

  constructor (props) {
    super(props)
    this.renderHeader = this.renderHeader.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.renderBody = this.renderBody.bind(this)
  }

  renderHeader () {
    const {title, prefixCls} = this.props
    return (
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-title`}>{title}</div>
      </div>
    )
  }

  renderBody () {
    const {prefixCls, bodyStyle, children, bodyProps} = this.props
    return (
      <div
        className={`${prefixCls}-body`}
        style={bodyStyle}
        ref="body"
        {...bodyProps}
      >
        {children}
      </div>
    )
  }

  renderFooter () {
    const {prefixCls, buttonStyle, footer, operation} = this.props
    return (
      <div className={`${prefixCls}-footer`} ref="footer">
        {
          footer ? footer : <div className={`${prefixCls}-button-group-${!operation ? 'h' : 'v'}`}>
            <a className={`${prefixCls}-button`} role="button" style={buttonStyle} href="#">
              取消
            </a>
            <a className={`${prefixCls}-button`} role="button" style={buttonStyle} href="#">
              确定
            </a>
          </div>
        }
      </div>
    )
  }

  render () {

    const {className, prefixCls, title, show,style, onCancel,} = this.props
    const maskCls = classNames({
      'mi-animate-fade-in': show,
      'mi-animate-fade-out': !show,
    })
    const modalCls = classNames(
      prefixCls, {
        'mi-animate-fade-in': show,
        'mi-animate-fade-out': !show
      }, className)
    const rootStyle = {
      ...style,
      width: '5.4rem',
      height: 'auto',
    }
    return (

      show ? (
        <div>
          <Mask className={maskCls}/>
          <div className={`${prefixCls}-wrap`}>
            <div className={modalCls} style={rootStyle}>
              <div className={`${prefixCls}-content`}>
                {
                  title && this.renderHeader()
                }
                {
                  this.renderBody()
                }
                {
                  this.renderFooter()
                }
              </div>
            </div>
          </div>

        </div>
      ) : false
    )
  }
}
