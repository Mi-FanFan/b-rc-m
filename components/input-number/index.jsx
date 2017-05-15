import React, { Component }from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import DecIncControl from './DecIncControl'
export default class InputNumber extends Component {
  constructor (props) {
    super(props)
    this.toFixed = this.toFixed.bind(this)
    this.getPrecision = this.getPrecision.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.checkDecAvailable = this.checkDecAvailable.bind(this)
    this.checkIncAvailable = this.checkIncAvailable.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDec = this.handleDec.bind(this)
    this.handleInc = this.handleInc.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.state = {
      isFocused: false,
      value: props.defaultValue
    }
  }

  handleDec () {
    this.dec()
  }

  handleInc () {
    this.inc()
  }

  toFixed (value) {
    const old = this.getPrecision(this.state.value)
    const step = this.getPrecision(this.props.step)
    if (!old && !step) {
      return value
    }
    return value.toFixed(Math.max(old, step))
  }

  getPrecision (value) {
    const v = String(value)
    if (!/\./.test(v)) {
      return 0
    }
    return v.split('.')[1].length
  }

  handleChange (e) {
    this.updateValue(e.target.value)
  }

  updateValue (v) {
    const {disabled, onChange, min, max} = this.props
    if (disabled || !onChange) {
      return
    }
    v = parseFloat(v)
    if (isNaN(v)) {
      return
    }
    if (min !== undefined && v < min) {
      v = min
    }
    if (max !== undefined && v > max) {
      v = max
    }
    v = parseFloat(this.toFixed(v))
    this.setState({
      value: v
    })
    onChange(v)
  }

  checkDecAvailable () {
    const {disabled, min} = this.props
    const {value} = this.state
    if (disabled) {
      return false
    }

    if (!Number.isInteger(min)) {
      return true
    }

    return value > min
  }

  checkIncAvailable () {
    const {disabled, max} = this.props
    const {value} = this.state
    if (disabled) {
      return false
    }

    if (!Number.isInteger(max)) {
      return true
    }

    return value < max
  }

  dec () {
    const {step, min} = this.props
    const {value} = this.state
    let v = value - step

    if (v < min) {
      v = min
    }

    this.updateValue(v)
  }

  inc () {
    const {step, max} = this.props
    const {value} = this.state
    let v = value + step

    if (v > max) {
      v = max
    }

    this.updateValue(v)
  }

  handleFocus () {
    this.setState({isFocused: true})
  }

  handleBlur () {
    this.setState({isFocused: false})
  }

  render () {
    const {className, prefixCls, disabled, name,} = this.props
    const inputNumberClass = classNames({
      [`${prefixCls}`]: true,
    }, className)
    const inputClass = classNames({
      [`${prefixCls}-input`]: true,
      [`${prefixCls}-input-focused`]: this.state.isFocused,
    })
    return (
      <div className={inputNumberClass}>
        <DecIncControl
          type="dec"
          onClick={this.handleDec}
          disabled={!this.checkDecAvailable()}
        />
        <input
          className={inputClass}
          value={this.state.value}
          autoComplete="off"
          disabled={disabled}
          name={name}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <DecIncControl
          type="inc"
          onClick={this.handleInc}
          disabled={!this.checkIncAvailable()}
        />
      </div>
    )
  }
}
InputNumber.defaultProps = {
  prefixCls: 'mi-input-number',
  disabled: false,
  step: 1,
  onChange: () => {},
}
InputNumber.propTypes = {
  prefixCls: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
}
