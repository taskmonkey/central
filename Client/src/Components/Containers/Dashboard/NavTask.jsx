import React from 'react';
import { render } from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';

import styled from 'styled-components';

import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_business_center } from 'react-icons-kit/md/ic_business_center';
import { ic_format_list_bulleted } from 'react-icons-kit/md/ic_format_list_bulleted';
import { ic_people } from 'react-icons-kit/md/ic_people';
import { ic_shopping_cart } from 'react-icons-kit/md/ic_shopping_cart';
import { fileText2 } from 'react-icons-kit/icomoon/fileText2';
import { pen } from 'react-icons-kit/icomoon/pen';
import { profile } from 'react-icons-kit/icomoon/profile';
import { stack } from 'react-icons-kit/icomoon/stack';
import { quill } from 'react-icons-kit/icomoon/quill';
import { bell } from 'react-icons-kit/icomoon/bell';
import { database } from 'react-icons-kit/icomoon/database';

const Icon20 = props => <SvgIcon size={props.size || 20} icon={props.icon} />;

const BaseContainer = props =>
    <div
        style={{
            color: '#fff',
            fontFamily: 'Lato'
        }}
    >
        {props.children}
    </div>;

const Title = styled.div`
    padding: 12px;
`;

const Separator = styled.div`
    padding-right: 12px;
`;
const SeparatorTitleContainer = styled.div`
    font-size: 14px;
    color: #AAA;
    margin: 10px 12px;
    padding: 4px 12px 2px;
`;
const SeparatorTitle = props => {
    return (
        <SeparatorTitleContainer>
            {props.children}
            <hr style={{ border: 0, borderTop: '1px solid #E5E5E5' }} />
        </SeparatorTitleContainer>
    );
};



const SideNavWithAlerts = () =>
    <SideNav
        hoverBgColor="#232a2f"
        hoverColor="#36bbea"
        highlightBgColor="#00acac"
        defaultSelected="products"
        highlightColor="#FFF"
        fontFamily="Lato"

    >
        <div />
        <Nav id="dashboard">
            <NavIcon><Icon20 icon={ic_aspect_ratio} /></NavIcon>
            <NavText><Link to="/dashboard">{' '}<span style={{ paddingRight: 6 }}>Dashboard</span>{' '}</Link></NavText>
        </Nav>

        <Nav id="products">
            <NavIcon><Icon20 icon={profile} /></NavIcon>
            <NavText> Users </NavText>
        </Nav>
        <Nav id="orders">
            <NavIcon><Icon20 icon={pen} /></NavIcon>
            <NavText>
                <Link to="/tasksList">{' '}<span style={{ paddingRight: 6 }}>Projects</span>{' '}</Link>
                <span
                    style={{
                        textAlign: 'center',
                        lineHeight: '16px',
                        height: 16,
                        width: 16,
                        margin: '0 auto',
                        borderRadius: '50%',
                        fontSize: 9,
                        display: 'inline-block',
                        color: '#FFF',
                        background: '#ff5b57',
                        fontFamily: 'Lato'

                    }}
                >
          10
                </span>
            </NavText>
        </Nav>

        <Nav id="customers">
            <NavIcon><Icon20 icon={stack} /></NavIcon>
            <NavText> My Tasks </NavText>
            <Nav id="dashboard2">
                <NavIcon><Icon20 size={16} icon={quill} /></NavIcon>
                <NavText> Tasks </NavText>
            </Nav>
            <Nav
                id="sales2"
                onNavClick={() => {
                    console.log('Promote clicked!', arguments);
                }}
            >
                <NavIcon><Icon20 size={16} icon={bell} /></NavIcon>
                <NavText> Alert </NavText>
            </Nav>
            {/* <Nav id="products2">
                <NavIcon><Icon20 size={16} icon={ic_business_center} /></NavIcon>
                <NavText> Reports </NavText>
            </Nav> */}
        </Nav>
        <Nav
            id="sales"
            onNavClick={() => {
                console.log('Sales clicked!', arguments);
            }}
        >
            <NavIcon><Icon20 icon={fileText2} /></NavIcon><NavText> Reports </NavText>
        </Nav>
        <Nav id="deliveries">
            <NavIcon><Icon20 icon={database} /></NavIcon>
            <NavText> Settings </NavText>
        </Nav>
    </SideNav>;



class NavTask extends React.Component {
    render() {
        return (
            <div className="sideBar">
                <BaseContainer style={{ background: '#2c3e50', color: '#FFF' , fontFamily: 'Lato'}}>
                    {/* <BasicSideNav /> */}
                </BaseContainer>
                <Separator />
                <BaseContainer
                    style={{
                        background: '#FFF',
                        color: '#444',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
                    }}
                >
                    {/* <BasicSideNavLite /> */}
                </BaseContainer>
                <Separator />
                <BaseContainer
                    style={{
                        fontSize: 12,
                        background: '#2d353c',
                        color: '#a8acb1',
                        paddingTop: 0
                    }}
                >
                    <div style={{ display: 'flex', padding: 16, background: '#003E58', fontFamily: 'Lato' }}>
                        <div style={{ width: 40, height: 40 }}>
                            <img
                                src="data:image/jpeg;base64,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"
                                style={{ borderRadius: '30px', width: 40, height: 40 }}
                            />
                        </div>
                        <div style={{ paddingLeft: 6, paddingTop: 6 }}>
                            <div style={{ fontSize: 12, color: '#E5E5E5' }}>
                                {' '}Giannis Antentokounmpo{' '}
                            </div>
                            <div style={{ fontSize: 11,  color: '#E5E5E5' }}> Software Engineer </div>
                        </div>
                    </div>
                    <SideNavWithAlerts />
                </BaseContainer>
                <Separator />
                <BaseContainer
                    style={{
                        background: '#FFF',
                        color: '#444',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
                    }}
                >
                    {/* <ControlledNav /> */}
                </BaseContainer>
                <Separator />
            </div>
        );
    }
}

export default NavTask;
