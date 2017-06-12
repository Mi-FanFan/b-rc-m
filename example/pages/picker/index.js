import React from 'react'
import { CityPicker, Picker } from 'b-rc-m'
import Page from '../../component/page'
//import city from 'china-city'
import './picker.less'
const city = [{
  'name': '北京',
  'code': '110000',
  'sub': [{
    'name': '北京市',
    'code': '110000',
  }, {
    'name': '东城区',
    'code': '110101'
  }, {
    'name': '西城区',
    'code': '110102'
  }, {
    'name': '朝阳区',
    'code': '110105'
  }, {
    'name': '丰台区',
    'code': '110106'
  }, {
    'name': '石景山区',
    'code': '110107'
  }, {
    'name': '海淀区',
    'code': '110108'
  }, {
    'name': '门头沟区',
    'code': '110109'
  }, {
    'name': '房山区',
    'code': '110111'
  }, {
    'name': '通州区',
    'code': '110112'
  }, {
    'name': '顺义区',
    'code': '110113'
  }, {
    'name': '昌平区',
    'code': '110114'
  }, {
    'name': '大兴区',
    'code': '110115'
  }, {
    'name': '怀柔区',
    'code': '110116'
  }, {
    'name': '平谷区',
    'code': '110117'
  }, {
    'name': '密云县',
    'code': '110228'
  }, {
    'name': '延庆县',
    'code': '110229'
  }]
}, {
  'name': '天津',
  'code': '120000',
  'sub': [{
    'name': '天津市',
    'code': '120000',
  }, {
    'name': '和平区',
    'code': '120101'
  }, {
    'name': '河东区',
    'code': '120102'
  }, {
    'name': '河西区',
    'code': '120103'
  }, {
    'name': '南开区',
    'code': '120104'
  }, {
    'name': '河北区',
    'code': '120105'
  }, {
    'name': '红桥区',
    'code': '120106'
  }, {
    'name': '东丽区',
    'code': '120110'
  }, {
    'name': '西青区',
    'code': '120111'
  }, {
    'name': '津南区',
    'code': '120112'
  }, {
    'name': '北辰区',
    'code': '120113'
  }, {
    'name': '武清区',
    'code': '120114'
  }, {
    'name': '宝坻区',
    'code': '120115'
  }, {
    'name': '滨海新区',
    'code': '120116'
  }, {
    'name': '宁河县',
    'code': '120221'
  }, {
    'name': '静海县',
    'code': '120223'
  }, {
    'name': '蓟县',
    'code': '120225'
  }]
}]
export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      sex: [
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
      show: false,
      text: '',
      city_show: false,
      city_text: '',
      city_value: '',
    }
    this.handleChangeSex = this.handleChangeSex.bind(this)
  }

  handleChangeSex (selected) {
    let value = ''
    selected.forEach((s, i) => {
      value = this.state.sex[i]['items'][s].label
    })
    this.setState({
      text: value,
      show: false
    })
  }

  render () {
    return (
      <Page className="button" title="Picker" subTitle="Picker">
        <div className="demo-title">
          应用场景示例
        </div>
        <div className="picker-container">
          <input type="text"
                 value={this.state.text}
                 onClick={ e => {
                   e.preventDefault()
                   this.setState({show: true})
                 }}
                 placeholder="Chose Your City"
                 readOnly={true}
          />
          <input type="text"
                 value={this.state.city_text}
                 onClick={ e => {
                   e.preventDefault()
                   this.setState({city_show: true})
                 }}
                 placeholder="Chose Your City"
                 readOnly={true}
          />
          <Picker
            show={this.state.show}

            onCancel={e => this.setState({show: false})}
            onChange={this.handleChangeSex}
            groups={this.state.sex}
          />
          <CityPicker
            data={city}
            selected={['120000', '120106']}
            onCancel={e => this.setState({city_show: false})}
            onChange={(text, value) => this.setState({city_text: text, city_value: value, city_show: false})}
            show={this.state.city_show}
          />

        </div>
      </Page>
    )
  }
};
