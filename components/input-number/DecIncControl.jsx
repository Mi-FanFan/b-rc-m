import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
export default class DecIncControl extends Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const {disabled, onClick} = this.props
    if (disabled) {
      return
    }
    onClick()
  }

  render () {

    const {prefixCls, type, disabled} = this.props

    const controlClassName = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-dec`]: type === 'dec',
      [`${prefixCls}-inc`]: type === 'inc',
      [`${prefixCls}-disabled`]: disabled,
    })
    return (
      <a
        className={controlClassName}
        onClick={this.handleClick}
      >
        {type === 'dec'?'-':'+'}
      </a>
    )
  }
}
DecIncControl.propTypes = {
  prefixCls: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}
DecIncControl.defaultProps = {
  prefixCls: 'mi-input-number-handler',
  disabled: false,
}
