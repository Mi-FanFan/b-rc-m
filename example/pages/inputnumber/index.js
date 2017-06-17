import React from 'react'
import { InputNumber } from 'b-rc-m'
import Page from '../../component/page'
import './input-number.less'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange (value){
    console.log('changed', value)
  }

  render () {
    return (
      <Page className="button" title="ListView" subTitle="长列表">
        <div style={{margin: '0 auto', width: '96%'}}>
          <InputNumber min={1} max={10} step={1} defaultValue={3} precision={0} readOnly onChange={this.onChange}/>
          <br/>
          <InputNumber min={1} max={10} step={1} defaultValue={3} precision={0} onChange={this.onChange}/>
          <br/>
          <InputNumber min={1} max={10} step={0.01} defaultValue={3} precision={1} onChange={this.onChange}/>
        </div>
      </Page>
    )
  }
}
