
import React from 'react';
import './page.less';

export default class Page extends React.Component {
    render() {
        const {title, subTitle, spacing, className, children, footer} = this.props;

        return (
            <div style={{height:'100%'}}>
              {children}
            </div>
        );
    }
};
