/**
 * Created by Freeman on 2017/3/9.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Flex from '../flex';
export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.clientWidth = document.documentElement.clientWidth;
  }

  render() {
    const {
      prefixCls, className, data, hasLine, columnNum, onClick = () => {
    },
    } = this.props;
    const dataLength = (data && data.length) || 0;
    const rowCount = Math.ceil(dataLength / columnNum);
    const renderItem = this.props.renderItem || ((dataItem) => (
          <div
            className={`${prefixCls}-item-contain column-num-${columnNum}`}
            style={{height: `${this.clientWidth / columnNum}px`}}
          >
            {
              React.isValidElement(dataItem.icon) ? dataItem.icon : (
                  <img className={`${prefixCls}-icon`} src={dataItem.icon} role="presentation"/>)
            }
            <div className={`${prefixCls}-text`}>{dataItem.text}</div>
          </div>
        )
      );
    const rowsArr = [];
    for (let i = 0; i < rowCount; i++) {
      const rowArr = [];
      for (let j = 0; j < columnNum; j++) {
        const dataIndex = i * columnNum + j;
        if (dataIndex < dataLength) {
          const el = data && data[dataIndex];
          rowArr.push(
            <Flex.Item
              key={`griditem-${dataIndex}`} className={`${prefixCls}-item`}
              onClick={() => onClick(el, dataIndex)}
            >
              {renderItem(el, dataIndex)}
            </Flex.Item>
          );
        } else {
          rowArr.push(<Flex.Item key={`griditem-${dataIndex}`}/>);
        }
      }
      rowsArr.push(<Flex justify="center" align="stretch" key={`gridline-${i}`}>{rowArr}</Flex>);
    }

    return (
      <div
        className={classNames({
          [prefixCls]: true,
          [`${prefixCls}-line`]: hasLine,
          [className]: className,
        })}
      >
        {rowsArr}
      </div>
    );
  }
}
Grid.defaultProps = {
  data: [],
  hasLine: true,
  columnNum: 4,
  prefixCls: 'mi-grid',
};
Grid.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  hasLine: PropTypes.bool,
  columnNum: PropTypes.number,
  prefixCls: PropTypes.string,
  onClick: PropTypes.func
}
