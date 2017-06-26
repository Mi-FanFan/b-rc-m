/**
 * Created by Freeman on 2017/1/6.
 */
import React, { Component } from 'react'
import { Swipe } from 'b-rc-m'
import './index.less'

export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rowWidth: 750
    }
  }

  componentDidMount () {
    this.setState({
      rowWidth: this.row.clientWidth
    })
  }

  render () {

    const recentHistory = [
      {
        id: 1,
        name: 'name1'
      },
      {
        id: 2,
        name: 'name2'
      },
      {
        id: 3,
        name: 'name3'
      },
    ]

    return (
      <div ref={row => this.row = row}>
        <Swipe hammerOptions={{}} parentWidth={this.state.rowWidth}>
          <div className="mf-product-recent-viewed__list">
            {
              recentHistory.map(history => (
                <div className="mf-product-item" key={history.id}>
                  <a className="mf-product-item__link">
                    <img
                      src={'http://cdn.mifanfan.cn/mifan/img/default-product.jpg'}
                      alt={history.name}/>
                  </a>
                  <p className="mf-product-item__name">{history.name}</p>
                </div>
              ))
            }
          </div>
        </Swipe>
      </div>
    )
  }
}
