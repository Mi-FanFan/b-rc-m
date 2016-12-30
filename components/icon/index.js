/**
 * Created by Freeman on 2016/12/30.
 */
import React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
export default (props) => {

  const {type, className = '', spin} = props;
  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin || type === 'loading',
    [`anticon-${type}`]: true,
  }, className);

  return <i {...omit(props, ['type', 'spin'])} className={classString}/>;
};
