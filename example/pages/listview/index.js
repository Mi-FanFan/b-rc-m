import React from 'react'
import { ListView } from 'b-rc-m'
import Page from '../../component/page'
import './listview.less'
function MyBody (props) {
  return (
    <div className="mi-list-body my-body">
      <span style={{display: 'none'}}>you can custom body wrap element</span>
      {props.children}
    </div>
  )
}

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: '麦当劳邀您过周末',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: '食惠周',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
]
let index = data.length - 1

const NUM_SECTIONS = 5
const NUM_ROWS_PER_SECTION = 5
let pageIndex = 0
export default class extends React.Component {

  constructor (props) {
    super(props)


    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.state = {
      dataSource: dataSource.cloneWithRows(data),
    }
  }

  componentDidMount () {
    // you can scroll to the specified position
    // this.refs.lv.refs.listview.scrollTo(0, 200);

    // simulate initial Ajax
    setTimeout(() => {
      this.genData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
      })
    }, 600)
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
  //     });
  //   }
  // }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    console.log('reach end', event)
    this.setState({isLoading: true})
    setTimeout(() => {
      this.genData(++pageIndex)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        isLoading: false,
      })
    }, 1000)
  }

  render () {
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }}
      />
    )
    const row = (rowData, sectionID, rowID) => {
      console.log(rowData)
      if (index < 0) {
        index = data.length - 1
      }
      const obj = data[index--]
      return (
        <div key={rowID} className="row">
          <div className="row-title">{obj.title}</div>
          <div style={{display: '-webkit-box', display: 'flex', padding: '0.3rem 0'}}>
            <img style={{height: '1.28rem', marginRight: '0.3rem'}} src={obj.img}/>
            <div className="row-text">
              <div style={{marginBottom: '0.16rem', fontWeight: 'bold'}}>{obj.des}</div>
              <div><span style={{fontSize: '0.6rem', color: '#FF6E27'}}>35</span>元/任务</div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <Page className="button" title="ListView" subTitle="长列表">
        <div style={{margin: '0 auto', width: '96%'}}>
          <ListView ref="lv"
                    dataSource={this.state.dataSource}
                    renderHeader={() => <span>header</span>}
                    renderFooter={() => <div style={{padding: 30, textAlign: 'center'}}>
                      {this.state.isLoading ? '加载中...' : '加载完毕'}
                    </div>}
                    renderSectionHeader={sectionData => (
                      <div>{`任务 ${sectionData.split(' ')[1]}`}</div>
                    )}
                    renderBodyComponent={() => <MyBody />}
                    renderRow={row}
                    renderSeparator={separator}
                    className="fortest"
                    style={{
                      height: document.documentElement.clientHeight * 3 / 4,
                      overflow: 'auto',
                      border: '1px solid #ddd',
                      margin: '0.1rem 0',
                    }}
                    pageSize={4}
                    scrollRenderAheadDistance={500}
                    scrollEventThrottle={20}
                    onScroll={() => { console.log('scroll') }}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
          />
        </div>
      </Page>
    )
  }
}
