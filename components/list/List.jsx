import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const List = props => {

  const {prefixCls, children, className, style, renderHeader, renderFooter, ...restProps} = props
  const wrapCls = classNames({
    [prefixCls]: true,
    [className]: className,
  })

  return (
    <div className={wrapCls} style={style} {...restProps}>
      {
        renderHeader ? (
          <div className={`${prefixCls}-header`}>
            {typeof renderHeader === 'function' ? renderHeader() : renderHeader}
          </div>
        ) : null
      }
      {children ? (<div className={`${prefixCls}-body`}>{children}</div>) : null}
      {
        renderFooter ? (
          <div className={`${prefixCls}-footer`}>
            {
              typeof renderFooter === 'function' ? renderFooter() : renderFooter}
          </div>
        ) : null
      }
    </div>
  )
}



List.propTypes = {
  style: PropTypes.any,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
  role: PropTypes.string,
}
List.defaultProps = {
  prefixCls: 'mi-list',
}
export default List
