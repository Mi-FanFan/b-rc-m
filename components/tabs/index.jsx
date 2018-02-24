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
        renderTabBar={this.renderTabBar}
        renderTabContent={this.renderTabContent}
        {...this.props}
      />
    )
  }

}
Tabs.propTypes = {

  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  onChange: PropTypes.func,
  onTabClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  tabBarExtraContent: PropTypes.node,
  tabBarStyle: PropTypes.object,
  tabPosition: PropTypes.oneOf(['top', 'bottom']),
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  animated: PropTypes.bool,
  swipeable: PropTypes.bool,
  children: PropTypes.any,
  destroyInactiveTabPane: PropTypes.bool,
  pageSize: PropTypes.number,
  speed: PropTypes.number,
  tabBarhammerOptions: PropTypes.any,
  hammerOptions: PropTypes.any,
}

Tabs.defaultProps = {
  prefixCls: 'mi-tabs',
  animated: true,
  swipeable: true,
  tabBarPosition: 'top',
  hammerOptions: {},
  tabBarhammerOptions: {},
  pageSize: 4,
  speed: 8,
  onChange() {},
  onTabClick() {},
}

Tabs.TabPane = TabPane
export default Tabs
