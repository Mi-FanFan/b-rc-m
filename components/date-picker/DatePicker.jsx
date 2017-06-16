/**
 * Created by freeman on 17-6-16.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import DatePickerItem from './DatePickerItem'
import PureRender from './pureRender'
import { convertDate, nextDate } from './time'

/**
 * Class DatePicker Component Class
 * @extends Component
 */
class DatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: nextDate(props.value),
      closing: false
    }

    this.handleFinishBtnClick = this.handleFinishBtnClick.bind(this)
    this.handleDateSelect = this.handleDateSelect.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    // update value of state
    const date = nextDate(nextProps.value)
    if (date.getTime() !== this.state.value.getTime()) {
      this.setState({value: date})
    }
  }

  /**
   * Optimization component, Prevents unnecessary rendering
   * Only props or state change or value before re-rendering
   *
   * @param  {Object} nextProps next props
   * @param  {Object} nextState next state
   * @return {Boolean}          Whether re-rendering
   */
  shouldComponentUpdate (nextProps, nextState) {
    const date = nextDate(nextState.value)
    return date.getTime() !== this.state.value.getTime() ||
      PureRender.shouldComponentUpdate(nextProps, nextState, this.props, this.state)
  }

  /**
   * 点击完成按钮事件
   * @return {undefined}
   */
  handleFinishBtnClick () {
    this.props.onSelect(this.state.value)
  }

  /**
   * 选择下一个日期
   * @return {undefined}
   */
  handleDateSelect (value) {
    this.setState({value})
  }

  handleClose (cb) {
    this.setState({
      closing: true
    }, () => setTimeout(() => {
      this.setState({closing: false})
      cb()
    }, 300))
  }

  renderActions () {
    const {lang, onCancel} = this.props
    return (
      <div className="mi-date-picker-navbar">
        <a
          className="mi-date-picker-navbar-btn"
          onClick={this.handleFinishBtnClick}
        >
          { lang.rightBtn }
        </a>
        <a
          className="mi-date-picker-navbar-btn"
          onClick={e => this.handleClose(() => {if (onCancel) onCancel(e)})}
        >
          { lang.leftBtn }
        </a>
      </div>
    )
  }

  /**
   * render函数
   * @return {Object} JSX对象
   */
  render () {
    const {min, max, dateFormat, onCancel, show, className} = this.props
    const value = this.state.value
    const maskCls = classNames({
      'mi-animate-fade-in': show && !this.state.closing,
      'mi-animate-fade-out': this.state.closing,
    })
    const datePickerCls = classNames(
      'mi-date-picker', {
        'mi-animate-slide-up': show && !this.state.closing,
        'mi-animate-slide-down': this.state.closing
      }, className)
    return (
      show ? (
        <div className="mi-date-picker-modal">
          <div
            className={datePickerCls}>

            <div className="mi-date-picker-content">
                <DatePickerItem
                  value={value}
                  min={min}
                  max={max}
                  typeName="Year"
                  format={dateFormat[0]}
                  onSelect={this.handleDateSelect}/>
                <DatePickerItem
                  value={value}
                  min={min}
                  max={max}
                  typeName="Month"
                  format={dateFormat[1]}
                  onSelect={this.handleDateSelect}/>
                <DatePickerItem
                  value={value}
                  min={min}
                  max={max}
                  typeName="Date"
                  format={dateFormat[2]}
                  onSelect={this.handleDateSelect}/>
            </div>
            {this.renderActions()}
          </div>
        </div>
      ) : false
    )
  }
}

DatePicker.propTypes = {
  theme: PropTypes.string,
  value: PropTypes.object,
  min: PropTypes.object,
  max: PropTypes.object,
  dateFormat: PropTypes.array,
  onSelect: PropTypes.func,
  onCancel: PropTypes.func,
  lang: PropTypes.object,
}

DatePicker.defaultProps = {
  lang: {leftBtn: '取消', rightBtn: '确定'},
  value: new Date(),
  min: new Date(1970, 0, 1),
  max: new Date(2050, 0, 1),
  dateFormat: ['YYYY', 'M', 'D'],
  onSelect: () => {},
  onCancel: () => {},
}

export default DatePicker
