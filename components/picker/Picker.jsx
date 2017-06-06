/**
 * Created by freeman on 17-5-25.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Mask from '../mask'
import PickerGroup from './PickerGroup'
export default class Picker extends Component {

  static propTypes = {
    /**
     * consists of array of object(max 2) with property `label` and others pass into element
     *
     */
    actions: PropTypes.array,
    /**
     * array objects consists of groups for each scroll group
     *
     */
    groups: PropTypes.array,
    /**
     * default group index thats selected, if not provide, automatic chose the best fiting item when mounted
     *
     */
    defaultSelect: PropTypes.array,
    /**
     * trigger when individual group change, pass property(`item`, `item index in group`, `group index in groups`, `selected`, `picker instance`)
     *
     */
    onGroupChange: PropTypes.func,
    /**
     * on selected change, pass property `selected` for array of slected index to `groups`
     *
     */
    onChange: PropTypes.func,
    /**
     * excute when the popup about to close
     *
     */
    onCancel: PropTypes.func,
    /**
     * display the component
     *
     */
    show: PropTypes.bool,
    /**
     * language object consists of `leftBtn` and `rightBtn`
     *
     */
    lang: PropTypes.object,
  }

  static defaultProps = {
    groups: [],
    show: false,
    lang: {leftBtn: '取消', rightBtn: '确定'},
  }

  constructor (props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleChanges = this.handleChanges.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.renderActions = this.renderActions.bind(this)
    this.renderGroups = this.renderGroups.bind(this)
    this.state = {
      selected: props.defaultSelect ? props.defaultSelect : Array(props.groups.length).fill(0),
      closing: false
    }
  }

  handleChanges () {
    const {onChange} = this.props
    this.handleClose(() => {
        if (onChange) {
          onChange(this.state.selected, this)
        }
      }
    )
  }

  handleChange (item, i, groupIndex) {

    const {onGroupChange} = this.props
    let selected = this.state.selected

    selected[groupIndex] = i
    this.setState({selected}, () => {
      if (onGroupChange) {
        onGroupChange(item, i, groupIndex, this.state.selected, this)
      }
    })
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
      <div className="mi-picker__hd">
        <a
          className="mi-picker__action"
          onClick={e => this.handleClose(() => {if (onCancel) onCancel(e)})}
        >
          { lang.leftBtn }
        </a>
        <a
          className="mi-picker__action"
          onClick={e => this.handleChanges()}
        >
          { lang.rightBtn }
        </a>
      </div>
    )
  }

  renderGroups () {
    const {groups} = this.props

    return groups.map((group, index) =>
      <PickerGroup
        key={index}
        {...group}
        groupIndex={index}
        defaultIndex={this.state.selected[index]}
        onChange={this.handleChange}
      />
    )
  }

  render () {

    const {className, show, groups, onCancel, ...others} = this.props

    const maskCls = classNames({
      'mi-animate-fade-in': show && !this.state.closing,
      'mi-animate-fade-out': this.state.closing,
    })
    const pickerCls = classNames(
      'mi-picker', {
        'mi-animate-slide-up': show && !this.state.closing,
        'mi-animate-slide-down': this.state.closing
      }, className)

    return (

      show ? (
        <div>
          <Mask className={maskCls} onClick={e => this.handleClose(() => {if (onCancel) onCancel(e)})}/>
          <div className={pickerCls} {...others}>
            { this.renderActions() }
            <div className="mi-picker__bd">
              {this.renderGroups()}
            </div>
          </div>
        </div>
      ) : false
    )
  }
}
