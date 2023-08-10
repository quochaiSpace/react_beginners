import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { handleLogoutRedux } from "../redux/actions/userAction";

import { useEffect } from "react";



const Header = (props) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const user = useSelector(state => state.user.account)

    const handleLogout = () => {
        dispatch(handleLogoutRedux());
    };

    useEffect(() => {
        if (user && user.auth === false) {
            navigate("/");
            toast.success("Log out Success");
        }
    }, [user]);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">React Beginners </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {((user && user.auth) || window.location.pathname === "/") && (
                        <Nav className="me-auto">
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                            <NavLink to="/users" className="nav-link">
                                Manage Users
                            </NavLink>

                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                {user && user.auth === true ? (
                                    <NavDropdown.Item onClick={() => handleLogout()}>
                                        Logout
                                    </NavDropdown.Item>
                                ) : (
                                    <NavLink to="/login" className="dropdown-item">
                                        Login
                                    </NavLink>
                                )}
                            </NavDropdown>
                            {user && user.email && (
                                <span className="nav-link">Wellcome: {user.email} </span>
                            )}
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
