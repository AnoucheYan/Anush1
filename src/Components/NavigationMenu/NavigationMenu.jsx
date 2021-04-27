import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './navigationMenu.module.css';


const menuItems = [
    {
        to: "/",
        value: "Home"
    },
    {
        to: "/contact",
        value: "Contact"
    },
    {
        to: "/about",
        value: "About"
    }
]

const NavigationMenu = () => {
    const items = menuItems.map((item, idx) => {
        return (
            <Nav.Item key={idx}>
                <NavLink key={idx} to={item.to} activeStyle={{ color: "rgb(13, 77, 74)" }} exact>
                    {item.value}
                </NavLink>
            </Nav.Item>
        );
    })

    return (
        <Navbar expand="sm">
            <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.navbarToggleButton} />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav activeKey="/home">
                    {items}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default NavigationMenu;