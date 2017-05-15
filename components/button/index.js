/**
 * Created by Freeman on 2017/1/19.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Touchable from 'rc-touchable'
import Icon from '../icon'
import splitObject from '../utils/splitObject'
class Button extends Component {

  render() {
    let [{children, className, prefixCls, type, size, inline, across, disabled, icon, loading, activeStyle,}, restProps] = splitObject(this.props, ['children', 'className', 'prefixCls', 'type', 'size', 'inline', 'across',
      'disabled', 'icon', 'loading', 'activeStyle']);
    const wrapCls = {
      [className]: className,
      [prefixCls]: true,
      [`${prefixCls}-primary`]: type === 'primary',
      [`${prefixCls}-ghost`]: type === 'ghost',
      [`${prefixCls}-warning`]: type === 'warning',
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-inline`]: inline,
      [`${prefixCls}-across`]: across,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-loading`]: loading,
    };
    const iconType = loading ? 'loading' : icon;
    if (iconType) {
      wrapCls[`${prefixCls}-icon`] = true;
    }

    return (
      <Touchable
        activeClassName={activeStyle ? `${prefixCls}-active` : undefined}
        disabled={disabled}
        activeStyle={activeStyle}
      >
        <a
          {...restProps}
          role="button"
          className={classNames(wrapCls)}
          disabled={disabled}
          onClick={disabled ? () => {
            } : this.props.onClick}
        >
          {iconType ? <Icon type={iconType}/> : null}
          {children}
        </a>
      </Touchable>
    );
  }
}
Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'warning', 'ghost']),
  size: PropTypes.oneOf(['large', 'small']),
  inline: PropTypes.bool,
  across: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
  /** web only */
  prefixCls: PropTypes.string,
  activeStyle: PropTypes.any,
}

Button.defaultProps = {
  prefixCls: 'mi-button',
  size: 'large',
  inline: false,
  across: false,
  disabled: false,
  loading: false,
  activeStyle: {},
}

export default Button
