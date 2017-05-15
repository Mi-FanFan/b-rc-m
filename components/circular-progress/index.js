/**
 * Created by Freeman on 2017/2/16.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
class CircularProgress extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      style,
      size,
      prefixCls,
      thickness,
    } = this.props;
    return (
      <div className={`${prefixCls}-root`} style={{...style}}>
        <div ref="wrapper" className={`${prefixCls}-wrapper`}>
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className={`${prefixCls}-svg`}
          >
            <circle
              ref="path"
              className={`${prefixCls}-path`}
              cx={size / 2}
              cy={size / 2}
              r={(size - thickness) / 2}
              fill="none"
              strokeWidth={thickness}
              strokeMiterlimit="20"
            />
          </svg>
        </div>
      </div>
    )
  }
}
CircularProgress.propTypes = {
  prefixCls: PropTypes.string,
  /**
   * The value of progress
   */
  percent: PropTypes.number,
  /**
   * The diameter of the progress in pixels.
   */
  size: PropTypes.number,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * Stroke width in pixels.
   */
  thickness: PropTypes.number,
}

CircularProgress.defaultProps = {
  prefixCls: 'mi-circular-progress',
  size: 40,
  thickness: 3.5,
}

export default CircularProgress
