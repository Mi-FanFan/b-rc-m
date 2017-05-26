import React from 'react';
import {WhiteSpace} from 'antd-mobile'
import {Picker} from 'b-rc-m';
import Page from '../../component/page';
import './picker.less';

export default class extends React.Component {

  constructor (props){
    super(props)
    this.state = {
      show:false
    }
  }

  render() {
    return (
      <Page className="button" title="Picker" subTitle="Picker">
        <div className="demo-title">
          应用场景示例
        </div>
        <div className="picker-container">
          <input type="text"
                 onClick={ e=> {
                   e.preventDefault();
                   this.setState({show: true})
                 }}
                 placeholder="Chose Your City"
                 readOnly={true}
          />
          <Picker
            show={this.state.show}
            onCancel={e=>this.setState({show: false})}
            onChange={text=>this.setState({city_value: text, show: false})}
            groups={[
              {
                items: [
                  {
                    label: 'Item1'
                  },
                  {
                    label: 'Item2 (Disabled)',
                    disabled: true
                  },
                  {
                    label: 'Item3'
                  },
                  {
                    label: 'Item4'
                  },
                  {
                    label: 'Item5'
                  }
                ]
              }
            ]}
          />
        </div>
      </Page>
    );
  }
};
