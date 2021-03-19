import {Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './navigationMenu.module.css';


const menuItems = [
    {
        to: "/",
        value: "Home"
    },
    {
        to: "/about",
        value: "About"
    },
    {
        to: "/contact",
        value: "Contact"
    }
]

const NavigationMenu = () => {
    const items = menuItems.map((item, idx) => {
        return (
            <Nav.Item key = {idx}>
                <NavLink to = {item.to} activeClassName = {styles.activeItem} exact>
                    {item.value}
                </NavLink>
            </Nav.Item>
        );
    })
    return (
        <Nav activeKey="/home">
            {items}
        </Nav>
    );
}

export default NavigationMenu;