/**
 * Created by Freeman on 2017/2/24.
 */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
const Flex = ({direction, wrap, justify, align, alignContent, className, children, prefixCls, style, onClick}) => {

  const wrapCls = classNames({
    [prefixCls]: true,
    [`${prefixCls}-dir-row`]: direction === 'row',
    [`${prefixCls}-dir-row-reverse`]: direction === 'row-reverse',
    [`${prefixCls}-dir-column`]: direction === 'column',
    [`${prefixCls}-dir-column-reverse`]: direction === 'column-reverse',
    [`${prefixCls}-nowrap`]: wrap === 'nowrap',
    [`${prefixCls}-wrap`]: wrap === 'wrap',
    [`${prefixCls}-wrap-reverse`]: wrap === 'wrap-reverse',
    [`${prefixCls}-justify-start`]: justify === 'start',
    [`${prefixCls}-justify-end`]: justify === 'end',
    [`${prefixCls}-justify-center`]: justify === 'center',
    [`${prefixCls}-justify-between`]: justify === 'between',
    [`${prefixCls}-justify-around`]: justify === 'around',
    [`${prefixCls}-align-top`]: align === 'top' || align === 'start',
    [`${prefixCls}-align-middle`]: align === 'middle' || align === 'center',
    [`${prefixCls}-align-bottom`]: align === 'bottom' || align === 'end',
    [`${prefixCls}-align-baseline`]: align === 'baseline',
    [`${prefixCls}-align-stretch`]: align === 'stretch',
    [`${prefixCls}-align-content-start`]: alignContent === 'start',
    [`${prefixCls}-align-content-end`]: alignContent === 'end',
    [`${prefixCls}-align-content-center`]: alignContent === 'center',
    [`${prefixCls}-align-content-between`]: alignContent === 'between',
    [`${prefixCls}-align-content-around`]: alignContent === 'around',
    [`${prefixCls}-align-content-stretch`]: alignContent === 'stretch',
    [className]: className,
  });
  return (
    <div className={wrapCls} style={style} onClick={onClick}>
      {children}
    </div>
  );
}
Flex.propTypes = {
  prefixCls: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  justify: PropTypes.oneOf(['start', 'end', 'center', 'between', 'around']),
  align: PropTypes.oneOf(['top', 'start', 'middle', 'center', 'bottom', 'end', 'baseline', 'stretch']),
  alignContent: PropTypes.oneOf(['start', 'end', 'center', 'between', 'around', 'stretch']),
  onClick: PropTypes.func
}

Flex.defaultProps = {
  prefixCls: 'mi-flexbox',
  align: 'center',
  onClick: () => {
  },
};

export default Flex
