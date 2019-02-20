import React, {Component} from "react";
import {NavLink} from 'react-router-dom'
import { Menu, Icon, Responsive, Sidebar, Button } from "semantic-ui-react";

class MobileMenu extends Component {
    state = {}

    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state

        return(
            <Responsive as={Sidebar.Pushable} maxWidth={Responsive.onlyMobile.maxWidth} >
                        <Sidebar
                            as={Menu}
                            animation='push'
                            inverted
                            onHide={this.handleSidebarHide}
                            vertical
                            visible={sidebarOpened}
                        >
                            <NavLink to="/">
                                <Menu.Item> Overview</Menu.Item>
                            </NavLink>
                            <NavLink to="/sensors/">
                                <Menu.Item>Detail</Menu.Item>
                            </NavLink>
                            <a href="http://192.168.0.242:8000/index.html">
                                <Menu.Item>Camera</Menu.Item>
                            </a>
                        </Sidebar>
                        <Sidebar.Pusher dimmed={sidebarOpened}>
                            <Button icon onClick={this.handleToggle}>
                                <Icon name='sidebar' />
                            </Button>
                            {children}
                        </Sidebar.Pusher>
            </Responsive>
        );
    }
} 
   

const DesktopMenu = ({children}) =>
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Menu icon='labeled' vertical inverted fixed='left'>
            <NavLink to="/">
                <Menu.Item name="index">
                    <Icon name="home" /> Overview
                </Menu.Item>
            </NavLink>
            <NavLink to="/sensors/">
                <Menu.Item name="Senzori">
                    <Icon name="area graph" /> Detail
                </Menu.Item>
            </NavLink>
            <a href="http://192.168.0.242:8000/index.html">
                <Menu.Item name="Camera">
                    <Icon name="video camera    " /> Camera
                </Menu.Item>
            </a>
            </Menu>
        <div className='desktopOverview'>
            {children}
        </div>
        
    </Responsive>

const Sidemenu = ({children}) => 
    <div>
        <DesktopMenu>{children}</DesktopMenu>
        <MobileMenu>{children}</MobileMenu>
    </div>


export default Sidemenu;