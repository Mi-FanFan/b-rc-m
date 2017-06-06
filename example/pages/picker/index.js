import React from 'react';
import {WhiteSpace} from 'antd-mobile'
import {Picker,CityPicker} from 'b-rc-m';
import Page from '../../component/page';
import './picker.less';
import city from 'china-city'
export default class extends React.Component {

  constructor (props){
    super(props)
    this.state = {
      sex:[
        {
          items: [
            {
              label: '男'
            },
            {
              label: '女'
            },
            {
              label: '保密'
            },
            {
              label: '不男',
              disabled: true
            },
            {
              label: '不女',
              disabled: true
            },
          ]
        }
      ],
      show:false,
      text:'',
      city_show: false,
      city_text:'',
      city_value:'',
    }
    this.handleChangeSex = this.handleChangeSex.bind(this)
  }

  handleChangeSex(selected){
    let value = ''
    selected.forEach( (s, i)=> {
      value = this.state.sex[i]['items'][s].label
    })
    this.setState({
      text: value,
      show: false
    })
  }

  render() {
    return (
      <Page className="button" title="Picker" subTitle="Picker">
        <div className="demo-title">
          应用场景示例
        </div>
        <div className="picker-container">
          <input type="text"
                 value={this.state.text}
                 onClick={ e=> {
                   e.preventDefault();
                   this.setState({show: true})
                 }}
                 placeholder="Chose Your City"
                 readOnly={true}
          />
          <input type="text"
                 value={this.state.city_text}
                 onClick={ e=> {
                   e.preventDefault();
                   this.setState({city_show: true})
                 }}
                 placeholder="Chose Your City"
                 readOnly={true}
          />
          <Picker
            show={this.state.show}

            onCancel={e=>this.setState({show: false})}
            onChange={this.handleChangeSex}
            groups={this.state.sex}
          />
          <CityPicker
            data={city}
            selected={['120000','120000','120106']}
            onCancel={e=>this.setState({city_show: false})}
            onChange={(text,value)=>this.setState({city_text: text,city_value: value, city_show: false})}
            show={this.state.city_show}
          />

        </div>
      </Page>
    );
  }
};
