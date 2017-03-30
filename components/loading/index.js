/**
 * Created by Freeman on 2017/3/30.
 */
import React, { PropTypes } from 'react'
import classNames from 'classnames'
const Loading = ({prefixCls, className}) => {

  const wrapCls = classNames({
    [prefixCls]: true,
    [className]: className,
  })

  return (
    <div className={wrapCls}>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  )
}

Loading.propTypes = {
  prefixCls: PropTypes.string,
}

Loading.defaultProps = {
  prefixCls: 'mi-loading',
}

export default Loading;
