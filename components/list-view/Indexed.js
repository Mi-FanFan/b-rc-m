/**
 * Created by Freeman on 2017/5/11.
 */
import React,{Component} from 'react';
import MListView from 'rmc-list-view';
import handleProps from './handleProps';
const IndexedList = MListView.IndexedList;

export default class MIndexedList extends Component {
  static defaultProps = {
    prefixCls: 'mi-indexed-list',
    listPrefixCls: 'mi-list',
    listViewPrefixCls: 'mi-list-view',
  };
  render() {
    const { prefixCls, listPrefixCls } = this.props;
    const { restProps, extraProps } = handleProps(this.props, true);
    return (
      <IndexedList
        ref="indexedList"
        sectionHeaderClassName={`${prefixCls}-section-header ${listPrefixCls}-body`}
        sectionBodyClassName={`${prefixCls}-section-body ${listPrefixCls}-body`}
        {...restProps}
        {...extraProps}
      >
        {this.props.children}
      </IndexedList>
    );
  }
}
