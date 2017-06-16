import React from 'react'
import { DatePicker } from 'b-rc-m'
import Page from '../../component/page'

import './picker.less'
export default class Demo extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      time: new Date(),
      isOpen: false,
    }
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  }

  handleCancel = () => {
    this.setState({ isOpen: false });
  }

  handleSelect = (time) => {
    this.setState({ time, isOpen: false });
  }

  render () {
    return (
      <Page className="button" title="Picker" subTitle="Picker">
        <div className="demo-title">
          应用场景示例
        </div>
        <div className="picker-container">
          <a
            className="select-btn"
            onClick={this.handleClick}>
            select time:{convertDate(this.state.time,'YYYY-MM-DD')}
          </a>

          <DatePicker
            value={this.state.time}
            show={this.state.isOpen}
            onSelect={this.handleSelect}
            onCancel={this.handleCancel} />

        </div>
      </Page>
    )
  }
};

function convertDate(date, format) {
  let str = format;
  const o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  if (/(Y+)/.test(format)) {
    str = str.replace(RegExp.$1,
      (date.getFullYear().toString()).substr(4 - RegExp.$1.length));
  }

  for (const k in o) { // eslint-disable-line
    if (new RegExp(`(${k})`).test(format)) {
      str = str.replace(RegExp.$1,
        (RegExp.$1.length === 1) ?
          o[k] : (`00${o[k]}`.substr((o[k].toString()).length)));
    }
  }

  return str;
}
