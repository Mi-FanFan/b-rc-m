import React from 'react'
import {Button, Popup} from 'b-rc-m'
import Page from '../../component/page'
//import city from 'china-city'
import './popup.less'
export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      show: false,
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle(){
    this.setState({
      show: this.state.show
    })
  }

  render () {
    return (
      <Page className="button" title="Picker" subTitle="Picker">
        <div className="demo-title">
          应用场景示例
        </div>
        <div className="picker-container">
          <Button type="default" onClick={e=>this.setState({show: true})}>Popup</Button>
          <Popup
            show={this.state.show}
            onCancel={e=>this.setState({show: false})}
          >
            <div style={{height: '20vh', overflow: 'scroll'}}>
              <article>
                <h1>H1 Heading</h1>
                <section>
                  <h2 className="title">H2 Title</h2>
                  <section>
                    <h3>H3 Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat. Duis aute</p>
                  </section>
                  <section>
                    <h3>H3 Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </section>
                </section>
              </article>
            </div>
          </Popup>

        </div>
      </Page>
    )
  }
};
