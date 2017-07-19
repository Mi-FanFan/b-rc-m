/**
 * Created by Freeman on 2017/7/19.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
class CircularProgress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percent: props.initialAnimation ? 0 : props.percent,
    };
  }

  componentDidMount() {
    const {initialAnimation,percent} = this.props
    if (initialAnimation) {
      this.initialTimeout = setTimeout(() => {
        this.requestAnimationFrame = window.requestAnimationFrame(() => {
          this.setState({
            percent: percent,
          });
        });
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      percent: nextProps.percent,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.initialTimeout);
    window.cancelAnimationFrame(this.requestAnimationFrame);
  }

  render() {
    const {prefixCls,strokeWidth,classForPercentage,percent,textForPercentage} = this.props

    const radius = (50 - strokeWidth / 2);
    const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

    const diameter = Math.PI * 2 * radius;
    const progressStyle = {
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${((100 - this.state.percent) / 100 * diameter)}px`,
    };

    return (
      <svg
        className={`${prefixCls} ${classForPercentage ? classForPercentage(percent) : ''}`}
        viewBox="0 0 100 100"
      >
        <path
          className={`${prefixCls}-trail`}
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
        />

        <path
          className={`${prefixCls}-path`}
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
          style={progressStyle}
        />

        <text
          className={`${prefixCls}-text`}
          x={50}
          y={50}
        >
          {textForPercentage(percent)}
        </text>
      </svg>
    );
  }
}
CircularProgress.propTypes = {
  prefixCls: PropTypes.string,
  /**
   * Percentage to display.
   * */
  percent: PropTypes.number.isRequired,
  /**
   * Width of circular line
   * */
  strokeWidth: PropTypes.number,
  /**
   * Toggle whether to animate progress starting from 0% on initial mount.
   *
   * */
  initialAnimation: PropTypes.bool,
  /**
   * Function which can set an additional class to apply to top-level element,
   * which can be used for coloring/styling percent ranges differently.
   *
   * e.g. (pct) => pct < 100 ? 'incomplete' : 'complete'
   * */
  classForPercentage: PropTypes.func,
  /**
   * Function which sets text formatting given a percentage.
   *
   * e.g. (pct) => `${pct}%`
   * */
  textForPercentage: PropTypes.func,
}

CircularProgress.defaultProps = {
  prefixCls: 'mi-circular-progress',
  strokeWidth: 8,
  textForPercentage: (percent) => `${percent}`,
  initialAnimation: true,
}

export default CircularProgress
