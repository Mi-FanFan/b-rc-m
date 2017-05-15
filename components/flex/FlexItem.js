/**
 * Created by Freeman on 2017/2/24.
 */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
const FlexItem = ({children, className, prefixCls, style, onClick}) => {

  const wrapCls = classNames({
    [`${prefixCls}-item`]: true,
    [className]: className,
  });
  return (
    <div className={wrapCls} style={style} onClick={onClick}>
      {children}
    </div>
  );
}
FlexItem.propTypes = {
  flex: PropTypes.number,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
}

FlexItem.defaultProps = {
  prefixCls: 'mi-flexbox',
  onClick: () => {
  }
};

export default FlexItem
