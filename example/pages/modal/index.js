import React from 'react'
import { Modal ,Button} from 'b-rc-m'
import Page from '../../component/page'
import './modal.less'
export default class extends React.Component {

  constructor (props){
    super(props)
    this.state = {
      show:false,
    }
    this.handleChangeShow = this.handleChangeShow.bind(this)
  }

  handleChangeShow(){
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    return (
      <Page className="button" title="Modal" subTitle="Modal">

        <div className="picker-container">
          <Button onClick={this.handleChangeShow}> Modal 对话框</Button>
          <Modal
            show={this.state.show}
            title={'123'}
          >
            <h1>1234567</h1>
          </Modal>
        </div>
      </Page>
    );
  }
};
