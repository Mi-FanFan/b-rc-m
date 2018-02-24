/**
 * Created by Freeman on 2017/5/9.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MffTabs, { TabPane } from 'mff-tabs'
import SwipeableInkTabBar from 'mff-tabs/lib/SwipeableInkTabBar'
import InkTabBar from 'mff-tabs/lib/InkTabBar'
import SwipeableTabContent from 'mff-tabs/lib/SwipeableTabContent'
import TabContent from 'mff-tabs/lib/TabContent'

class Tabs extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (activeKey) {
    const {onChange} = this.props
    if (onChange) {
      onChange(activeKey)
    }
  }

  renderTabBar = () => {
    const {children, animated, speed, pageSize, tabBarhammerOptions, onTabClick} = this.props
    if (children.length > pageSize) {
      return (
        <SwipeableInkTabBar
          onTabClick={onTabClick}
          speed={speed}
          pageSize={pageSize}
          hammerOptions={tabBarhammerOptions}
        />
      )
    }
    return <InkTabBar inkBarAnimated={animated} onTabClick={onTabClick}/>
  }

  renderTabContent = () => {
    const {animated, swipeable, hammerOptions} = this.props
    return swipeable ? (
      <SwipeableTabContent animated={animated} hammerOptions={hammerOptions}/>
    ) : (
      <TabContent animated={animated}/>
    )
  }

  render () {
    return (
      <MffTabs
        {...this.props}
        renderTabBar={this.renderTabBar}
        hasTabHeader={this.props.hasTabHeader}
        renderTabContent={this.renderTabContent}
      />
    )
  }

}
Tabs.propTypes = {
  style: PropTypes.object,
  speed: PropTypes.number,
  children: PropTypes.any,
  animated: PropTypes.bool,
  onChange: PropTypes.func,
  swipeable: PropTypes.bool,
  onTabClick: PropTypes.func,
  pageSize: PropTypes.number,
  prefixCls: PropTypes.string,
  activeKey: PropTypes.string,
  className: PropTypes.string,
  onNextClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  hasTabHeader: PropTypes.bool,
  hammerOptions: PropTypes.any,
  tabBarStyle: PropTypes.object,
  tabBarExtraContent: PropTypes.node,
  tabBarhammerOptions: PropTypes.any,
  defaultActiveKey: PropTypes.string,
  destroyInactiveTabPane: PropTypes.bool,
  tabPosition: PropTypes.oneOf(['top', 'bottom']),
}

Tabs.defaultProps = {
  speed: 8,
  pageSize: 4,
  onChange() {},
  animated: true,
  swipeable: true,
  onTabClick() {},
  hammerOptions: {},
  hasTabHeader: true,
  prefixCls: 'mi-tabs',
  tabBarPosition: 'top',
  tabBarhammerOptions: {},
}

Tabs.TabPane = TabPane
export default Tabs
