/**
 * Created by Freeman on 2017/1/12.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toptips from './Toptips'
class Toaster extends Component {
  constructor(props) {
    super(props)
    this.handleShow = this.handleShow.bind(this)
    this.state = {
      show: false,
      timer: null,
    };
  }

  componentWillUnmount() {
    this.state.show && clearTimeout(this.state.timer);
  }

  componentWillReceiveProps(nextProps) {
    const {msg} = nextProps
    if (msg.content !== '' && msg.type) {
      this.handleShow()
    }
  }

  handleShow() {
    const {timeout,hideCallBack} = this.props
    this.setState({show: true});
    this.state.timer = setTimeout(() => {
      this.setState({show: false});
      hideCallBack()
    }, timeout);
  }

  render() {
    const {msg} = this.props
    return (
        <Toptips show={this.state.show} type={msg.type}>{msg.content}</Toptips>
    )
  }
}

Toaster.propTypes = {
  msg: PropTypes.shape({
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  timeout:PropTypes.number,
  hideCallBack: PropTypes.func.isRequired
}

Toaster.defaultProps = {
  timeout:3000
}
export default Toaster
