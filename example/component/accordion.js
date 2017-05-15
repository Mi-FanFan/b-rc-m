import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group'

class Accordion extends Component {
    static defaultProps = {
        transitionName: 'slide'
    }

    constructor(props){
        super(props)
        this.state = {
            showContent: false,
            headerOpacity: 1
        }
    }

    handleClick(e){
        this.setState({
            showContent: !this.state.showContent,
            headerOpacity: this.state.showContent ? 1 : 0.4
        })
    }

    render() {
        const { children, header, transitionName } = this.props
        let content = this.state.showContent ? children : false
        return (
            <div>
                <div onClick={this.handleClick.bind(this)}>
                    <div style={{
                        opacity: this.state.headerOpacity,
                        transition : 'opacity .3s'
                    }}>{ header }</div>
                </div>
                <CSSTransitionGroup
                  transitionName={transitionName}
                  transitionEnterTimeout={300}
                  >
                    {content}
                </CSSTransitionGroup>
            </div>
        )
    }
}

export default Accordion;
