/**
 * Created by Freeman on 2016/12/30.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.renderSvg = this.renderSvg.bind(this)
  }

  renderSvg() {
    let svg;
    try {
      svg = require(`./assets/${this.props.type}.svg`);
    }
    finally {
      return svg;
    }
  }

  render() {
    const {type, className, style, size = 'md'} = this.props;
    let xlinkHref = this.renderSvg();
    let outerIcon;
    if (!xlinkHref) {
      outerIcon = true;
      xlinkHref = type;
    }
    else {
      xlinkHref = `#${type}`;
    }
    const iconClassName = classNames({
      'mi-icon': true,
      [`mi-icon-${outerIcon ? type.substr(1) : type}`]: true,
      [`mi-icon-${size}`]: true,
      [className]: !!className,
    });
    return <svg className={iconClassName} style={style}>
      <use xlinkHref={xlinkHref}/>
    </svg>;
  }
}
Icon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg'])
};
export default Icon;
