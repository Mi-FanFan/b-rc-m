import React from 'react'
import {WhiteSpace} from 'antd-mobile'
import { Modal ,Button} from 'b-rc-m'
import Page from '../../component/page'
import './modal.less'
const alert = Modal.alert
const prompt = Modal.prompt
const operation = Modal.operation
export default class extends React.Component {

  constructor (props){
    super(props)
    this.state = {
      show:false,
    }
    this.handleChangeShow = this.handleChangeShow.bind(this)
    this.handleModalOk = this.handleModalOk.bind(this)
  }

  handleChangeShow(){
    this.setState({
      show: !this.state.show
    })
  }

  handleModalOk(){
    this.handleChangeShow()
    console.log('ok')
  }

  render() {
    return (
      <Page className="button" title="Modal" subTitle="Modal">

        <div className="picker-container">
          <Button onClick={this.handleChangeShow}> Modal 对话框</Button>
          <Modal
            show={this.state.show}
            title={'123'}
            handleCancel={this.handleChangeShow}
            handleOk={this.handleModalOk}
          >
            1234567
          </Modal>
          <WhiteSpace size="lg" />
          <Button onClick={() => alert('删除', '确定删除么???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
          ])}
          >确认对话框</Button>
          <WhiteSpace size="lg" />
          <Button onClick={() => alert('多个按钮情况', <div>这里有好多个按钮, 你试试</div>, [
            { text: '按钮一', onPress: () => console.log('第0个按钮被点击了') },
            { text: '按钮二', onPress: () => console.log('第1个按钮被点击了') },
            { text: '按钮三', onPress: () => console.log('第2个按钮被点击了') },
          ])}
          >弹出多个按钮 </Button>
        </div>

        <WhiteSpace size="lg" />
        <Button onClick={() => prompt('默认值', '默认值 defaultValue 类型', [
          { text: '取消' },
          { text: '提交', onPress: value => console.log(`输入的内容:${value}`) },
        ], 'plain-text', '100')}
        >输入框默认值 </Button>

        <WhiteSpace size="lg" />
        <Button onClick={() => operation([
          { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
          { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
        ])}
        >操作按钮</Button>
      </Page>
    );
  }
};
