import {Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'; // I can import Link and use it instead of NavLink, but link don't have activeStyle property
import styles from './navigationMenu.module.css';


const NavigationMenu = () => {
    return (

        <Nav activeKey="/home">
            <Nav.Item>
                <NavLink to = "/" activeClassName = {styles.activeItem} exact>HOME</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to = "/about" activeClassName = {styles.activeItem} exact>ABOUT</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to = "/contact" activeClassName = {styles.activeItem} exact>CONTACT</NavLink>
            </Nav.Item>
        </Nav>
    )
}


export default NavigationMenu;