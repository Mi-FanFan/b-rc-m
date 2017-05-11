/**
 * Created by Freeman on 2017/5/11.
 */
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import MListView from 'rmc-list-view'
import handleProps from './handleProps'

export default class ListView extends Component {

  render () {
    const {restProps, extraProps} = handleProps(this.props, false)
    let {useZscroller, refreshControl} = this.props
    if (refreshControl) {
      useZscroller = true
    }
    return <MListView ref="listview" {...restProps} {...extraProps} useZscroller={useZscroller}/>
  }
}

ListView.propTypes = {
  children: PropTypes.any,
  refreshControl: PropTypes.any,
  onScroll: PropTypes.func,
  scrollEventThrottle: PropTypes.number,
  removeClippedSubviews: PropTypes.bool, // offscreen views are removed
  dataSource: PropTypes.any,
  renderSeparator: PropTypes.func,
  renderRow: PropTypes.func,
  initialListSize: PropTypes.number,
  onEndReached: PropTypes.func,
  onEndReachedThreshold: PropTypes.number,
  pageSize: PropTypes.number,
  renderFooter: PropTypes.func,
  renderHeader: PropTypes.func,
  renderSectionHeader: PropTypes.func,
  renderScrollComponent: PropTypes.func,
  scrollRenderAheadDistance: PropTypes.number,
  onChangeVisibleRows: PropTypes.func,
  style: PropTypes.any,
  /** below web only */
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  listPrefixCls: PropTypes.string,
  listViewPrefixCls: PropTypes.string,
  contentContainerStyle: PropTypes.object,
  renderBodyComponent: PropTypes.func,
  renderSectionBodyWrapper: PropTypes.func,
  sectionBodyClassName: PropTypes.string,
  useZscroller: PropTypes.bool,
  useBodyScroll: PropTypes.bool,
  stickyHeader: PropTypes.bool,
  stickyProps: PropTypes.any, // https://github.com/captivationsoftware/react-sticky/blob/master/README.md#sticky--props
  stickyContainerProps: PropTypes.any,
  scrollerOptions: PropTypes.any,
  /** below web only, work at `ListView.IndexedList` */
  onQuickSearch: PropTypes.func,
  quickSearchBarStyle: PropTypes.object,
  quickSearchBarTop: PropTypes.object,
  delayTime: PropTypes.number,
  delayActivityIndicator: PropTypes.any,
}

ListView.defaultProps = {
  prefixCls: 'mi-list-view',
  listPrefixCls: 'mi-list',
}
