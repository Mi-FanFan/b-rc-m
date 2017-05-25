/**
 * Created by freeman on 17-5-25.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * screen mask, use in `Dialog`, `ActionSheet`, `Popup`.
 *
 */
const Mask = props => {

  const {transparent, className, prefixCls, ...others} = props;
  const clz = classNames({
    [prefixCls]: !transparent,
    [`${prefixCls}_transparent`]: transparent
  }, className);

  return (
    <div className={clz} {...others}/>
  );
}
Mask.propTypes = {
  prefixCls: PropTypes.string,
  /**
   * Whather mask should be transparent (no color)
   *
   */
  transparent: PropTypes.bool
};

Mask.defaultProps = {
  prefixCls: 'mi-mask',
  transparent: false
};

export default Mask;
