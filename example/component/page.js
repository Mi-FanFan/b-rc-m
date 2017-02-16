
import React from 'react';
import './page.less';

export default class Page extends React.Component {
    render() {
        const {title, subTitle, className, children} = this.props;

        return (
            <div className="page">
              <div className="demoName">
                {title}
                <p>{subTitle}</p>
              </div>
              {children}
            </div>
        );
    }
};
