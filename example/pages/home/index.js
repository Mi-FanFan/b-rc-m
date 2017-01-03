import React from 'react';
import {Flex, FlexItem, Cells, Cell, CellBody, CellFooter} from 'react-weui';
import { Link } from 'react-router';
import Page from '../../component/page';
import Accordion from '../../component/accordion';

import Logo from './images/logo.png';
import IconForm from './images/icon_nav_form.png';
//import IconFeedback from './images/icon_nav_feedback.png';
import IconLayout from './images/icon_nav_layout.png';
//import IconNav from './images/icon_nav_nav.png';
//import IconSearch from './images/icon_nav_search.png';

import './index.less';

const menus = [
    {
        name: 'Form',
        icon: IconForm,
        items: [
            {
                label: 'Button',
                to: '/button'
            },
        ]
    },
    {
        name: 'Basic Components',
        icon: IconLayout,
        items: [
            {
                label: 'Viewer',
                to: '/viewer'
            },
            {
                label: 'Icons',
                to: '/icons'
            },
            {
                label: 'Progress',
                to: '/progress'
            }
        ]
    }
]

const Home = (props) => {
    return (
        <Page
            className="home"
            title={<img src={Logo} alt="weui" height="21px" />}
            subTitle="A UI library by WeChat official design team, includes the most useful widgets/modules in mobile web applications."
            spacing
        >
            <ul>
                {menus.map((menu, i)=>(
                    <li key={i}>
                        <Accordion
                            header={
                                <Flex>
                                    <FlexItem component="p">
                                        {menu.name}
                                    </FlexItem>
                                    <img src={menu.icon} alt/>
                                </Flex>
                            }
                        >
                            <Cells>
                                {menu.items.map((item, j)=>(
                                        <Cell key={j} component={Link} to={item.to} access>
                                            <CellBody>
                                                {item.label}
                                            </CellBody>
                                            <CellFooter/>
                                        </Cell>
                                    ))}
                            </Cells>
                        </Accordion>
                    </li>
                ))}
            </ul>
        </Page>
    );
};

export default Home;
