/**
 * Created by Freeman on 2017/1/23.
 * 顶部导航
 */
import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Icon from '../icon'
import splitObject from '../utils/splitObject'
const NavBar = (props) => {
  let [
    {prefixCls, children, mode, className, iconName, showBack, leftContent, rightContent, onLeftClick,},
    restProps
  ] = splitObject(props, ['prefixCls', 'children', 'mode', 'className', 'iconName', 'showBack', 'leftContent', 'rightContent', 'onLeftClick',])
  const wrapCls = classNames({
    [className]: className,
    [prefixCls]: true,
    [`${prefixCls}-${mode}`]: true,
  })
  if (!showBack){
    iconName=false
  }
  return (
    <div {...restProps} className={wrapCls}>
      <div className={`${prefixCls}-left`} onClick={onLeftClick}>
        {iconName ? <span className={`${prefixCls}-left-icon`}><Icon type={iconName}/></span> : null}
        {showBack && <span className={`${prefixCls}-left-content`}>{leftContent}</span> }
      </div>
      <div className={`${prefixCls}-title`}>{children}</div>
      <div className={`${prefixCls}-right`}>
        {rightContent}
      </div>
    </div>
  )
}

NavBar.propTypes = {
  prefixCls: PropTypes.string,
  mode: PropTypes.oneOf(['dark', 'light']),
  iconName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  showBack: PropTypes.bool,
  leftContent: PropTypes.any,
  rightContent: PropTypes.any,
  onLeftClick: PropTypes.func,
}

NavBar.defaultProps = {
  prefixCls: 'mi-navbar',
  mode: 'dark',
  iconName: 'left',
  showBack: true,
  onLeftClick: () => {},
}

export default NavBar
