import React from 'react';
import {Button} from 'antd-mobile';
import Page from '../../component/page';
import Toaster from '../../../components/toaster'
import '../../../components/toaster/style'
import './toast.less'
export default class ButtonDemo extends React.Component {

    constructor(props){
      super(props)
      this.handle = this.handle.bind(this)
      this.handleHide = this.handleHide.bind(this)
      this.state = {
        msg:{
          type:'',
          content:''
        }
      }
    }

    handle(type,content){
      this.setState({
        msg:{
          type:type,
          content:content
        }
      })
    }
    handleHide(){
      this.setState({
        msg:{
          type:'',
          content:''
        }
      })
    }
    render() {
        return (
            <Page className="toaster" title="Toaster" subTitle="通知" spacing>
              <Button className="toast-btn" onClick={()=>this.handle('default','Warn Toptip')} type="default">Default Toptip</Button>
              <Button className="toast-btn" onClick={()=>this.handle('primary','Primary Toptip')} type="default">Primary Toptip</Button>
              <Button className="toast-btn" onClick={()=>this.handle('info','Info Toptip')} type="default">Info Toptip</Button>
              <Button className="toast-btn" onClick={()=>this.handle('warn','Warn Toptip')} type="default">Warn Toptip</Button>
              <Toaster msg={this.state.msg} hideCallBack={this.handleHide}/>
            </Page>
        );
    }
};
