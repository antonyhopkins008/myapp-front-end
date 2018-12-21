import React from 'react';
import {Link} from "react-router-dom";

export default class Header extends React.Component {
    renderUser() {
        const {userData, logout} = this.props;

        if (null === userData) {
            return <i className="fa fa-spinner fa-spin"/>
        }

        return (<span>
            {userData.username}&nbsp;
            <button className="btn btn-link btn-sm" onClick={logout}>Logout</button>
        </span>)
    }

    render() {
        const {isAuthenticated} = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                    Site
                </Link>

                <ul className="navbar-nav mr-auto">
                    {
                        !isAuthenticated &&
                        (
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        )
                    }
                </ul>

                <span className="navbar-text">
                    {isAuthenticated ? this.renderUser() : <Link to="/login">Sign in</Link>}
              </span>
            </nav>
        )
    }
}