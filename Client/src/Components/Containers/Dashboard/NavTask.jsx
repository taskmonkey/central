import React from 'react';
import { render } from 'react-dom';
import {Redirect, Link, withRouter} from 'react-router-dom';

import styled from 'styled-components';
import axios from 'axios'
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
import { circleLeft } from 'react-icons-kit/icomoon/circleLeft';
import { bubbles } from 'react-icons-kit/icomoon/bubbles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTasksByLoggedInUser, storeProfile, fetchTasks } from '../../../Actions/index.js'

import Auth from '../../../Auth/Auth.js'

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



const SideNavWithAlerts = (props) =>

    <SideNav
        hoverBgColor="#232a2f"
        hoverColor="#36bbea"
        defaultSelected="products"
        highlightColor="#FFF"
        fontFamily="Lato"

    >
        <div />
        <Nav id="dashboard">
            <NavIcon><Icon20 icon={ic_aspect_ratio} /></NavIcon>
            <NavText><Link to="/dashboard">{' '}<span className="navTaskSpans" style={{ paddingRight: 6 }}>Dashboard</span>{' '}</Link></NavText>
        </Nav>

        <Nav id="products">
            <NavIcon><Icon20 icon={profile} /></NavIcon>
            <NavText><Link to="/users">{' '}<span className="navTaskSpans" style={{ paddingRight: 6 }}>Users</span>{' '}</Link></NavText>
        </Nav>
        <Nav id="orders">
            <NavIcon><Icon20 icon={pen} /></NavIcon>
            <NavText>
                <Link to="/projectsList">{' '}<span className="navTaskSpans" style={{ paddingRight: 6 }}>Projects</span>{' '}</Link>
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
          {props.Projects}
                </span>
            </NavText>
        </Nav>

        <Nav id="customers">
            <NavIcon><Icon20 icon={stack} /></NavIcon>
            <NavText><Link to="/myTasks">{' '}<span className="navTaskSpans" style={{ paddingRight: 6 }}>My Tasks</span>{' '}<span
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
                        background: '#36bbea',
                        fontFamily: 'Lato'

                    }}
                >
                {props.Tasks}
                </span></Link></NavText>
            {/* <Nav id="dashboard2">
                <NavIcon><Icon20 size={16} icon={quill} /></NavIcon>
                <NavText><Link to="/myTasks"> <span style={{ paddingRight: 6 }}>Tasks</span>{' '}</Link>



                </NavText>

            </Nav>
            <Nav id="sales2">
                <NavIcon><Icon20 size={16} icon={bell} /></NavIcon>
                <NavText> Alert </NavText>
            </Nav> */}
            {/* <Nav id="products2">
                <NavIcon><Icon20 size={16} icon={ic_business_center} /></NavIcon>
                <NavText> Reports </NavText>
            </Nav> */}
        </Nav>
        <Nav
            id="sales"
            onNavClick={() => {
                //console.log('Sales clicked!', arguments);
            }}
        >
            <NavIcon><Icon20 icon={fileText2} /></NavIcon><NavText> <Link to="/settings">{' '}<span className="navTaskSpans" style={{ paddingRight: 6 }}>Reports</span>{' '}</Link> </NavText>
        </Nav>
        <Nav id="deliveries">
            <NavIcon><Icon20 icon={bubbles} /></NavIcon>
            <NavText><Link to="/chat">{' '}<span className="navTaskSpans" style={{ paddingRight: 6 }}>Chat</span>{' '}</Link></NavText>
        </Nav>
        <Nav id="deliveries">
            <NavIcon><Icon20 icon={database} /></NavIcon>
            <NavText><Link to="/settings">{' '}<span className="navTaskSpans" style={{ paddingRight: 6 }}>Settings</span>{' '}</Link></NavText>
        </Nav>
        <Nav id="deliveries">
            <NavIcon><Icon20 icon={circleLeft} /></NavIcon>
            <NavText><Link to="/login">{' '}<span className="navTaskSpans" onClick={props.Auth.logout} style={{ paddingRight: 6 }}>Logout</span>{' '}</Link></NavText>
        </Nav>
    </SideNav>;



class NavTask extends React.Component {
    constructor(){
        super()
        this.state = {
            auth: new Auth()
        }


    }

    // componentWillMount(){
    //     axios.get('/allOpenTasksOfUser', {params: {userid: this.props.profile.userid}})
    //         .then((data)=>{
    //             this.props.getTasksByLoggedInUser(data.data)
    //         })
    //         .catch((err)=>{
    //             console.log('error')
    //         })
    // }
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
                                src={this.props.profile.image}
                                style={{ borderRadius: '30px', width: 40, height: 40 }}
                            />
                        </div>
                        <div style={{ paddingLeft: 6, paddingTop: 6 }}>
                            <div style={{ fontSize: 18, color: '#E5E5E5', paddingLeft: 10  }}>
                                {'  ' + this.props.profile.nickname + '  '}
                            </div>
                            <div style={{ fontSize: 11,  color: '#E5E5E5', paddingLeft: 10 }}> Software Engineer </div>
                        </div>
                    </div>
                    <SideNavWithAlerts Projects = {this.props.projects.length} Tasks={this.props.tasks.length} Auth = {this.state.auth}/>
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

function mapStateToProps(state) {
    return {
        projects: state.tasks.allProjects,
        tasks:state.tasks.tasksByLoggedInUser,
        profile: state.tasks.profile
    }
}

export default connect(mapStateToProps)(NavTask);
