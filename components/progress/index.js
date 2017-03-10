import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
class Progress extends Component {
  render() {
    const {percent,prefixCls, position, unfilled, style ,appearTransition,color} = this.props;
    const wrapCls = classNames({
      [`${prefixCls}-bar`]:true,
      [`${prefixCls}-fixed-bar`]:position === 'fixed',
      [`${prefixCls}-hide-bar`]:unfilled === 'hide',
    })

    const percentStyle = {
      width:!appearTransition?`${percent}%`:0,
      //height:0
      backgroundColor:color
    }

    return (
        <div className={wrapCls}>
          <div className={`${prefixCls}-bar-inner`} style={{...style,...percentStyle}}></div>
        </div>
    );
  }
}
Progress.propTypes = {
  percent: PropTypes.number,
  position: PropTypes.oneOf(['fixed', 'normal']),
  unfilled: PropTypes.oneOf(['show', 'hide']),
  style: PropTypes.object,
  color: PropTypes.string,
  /** web only */
  prefixCls: PropTypes.string,
  appearTransition: PropTypes.bool,
}
Progress.defaultProps = {
  percent: 0,
  position: 'normal',
  unfilled: 'show',
  style: {},
  prefixCls: 'mi-progress',
  appearTransition: false
}
export default Progress;
