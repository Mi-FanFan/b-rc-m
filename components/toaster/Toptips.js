/**
 * Created by Freeman on 2017/1/12.
 * 顶部提示框组件
 */
import React, {PropTypes} from 'react'
import classNames from 'classnames'
const Toptips = (props) => {
  const {className, type, children, show, ...others} = props;
  const cls = classNames({
    'mi-toptips': true,
    [`mi-toptips_${type}`]: true,
    [className]: className
  });
  return (
    <div className={cls} {...others} style={{display: show ? 'block' : 'none'}}>
      {children}
    </div>
  )
}

Toptips.propTypes = {
  /**
   * display tips
   *
   */
  show: PropTypes.bool,
  /**
   * type: `default`, `warn`, `info`, `primary`
   */
  type: PropTypes.oneOf([`default`, `warn`, `info`, `primary`])
}

Toptips.defaultProps = {
  show: false,
  type: 'default'
};
export default Toptips
