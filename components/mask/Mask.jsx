/**
 * Created by freeman on 17-5-25.
 */
import React ,{Component}from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * screen mask, use in `Dialog`, `ActionSheet`, `Popup`.
 *
 */
class Mask extends Component{

  constructor (props) {
    super(props)
    this.show = this.show.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  destroy() {
    // Use regex to prevent matching `mask-open` as part of a different class, e.g. `my-mask-opened`
    const classes = document.body.className.replace(/(^| )mask-open( |$)/, ' ');
    document.body.className = classNames(classes).trim();
  }

  show() {
    const classes = document.body.className;
    document.body.className = classNames(classes,'mask-open');
  }

  componentDidMount() {
    this.show()
  }

  componentWillUnmount() {
    this.destroy();
  }
  render(){
    const {transparent, className, prefixCls, ...others} = this.props;
    const clz = classNames({
      [prefixCls]: !transparent,
      [`${prefixCls}_transparent`]: transparent
    }, className);

    return (
      <div className={clz} {...others}/>
    );
  }

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
