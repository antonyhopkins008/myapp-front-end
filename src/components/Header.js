import React from 'react';
import {Link} from "react-router-dom";

export default class Header extends React.Component {
    renderUser() {
        const {userData} = this.props;

        if (null === userData) {
            return <i className="fa fa-spinner fa-spin"/>
        }

        return (<span>{userData.username}</span>)
    }

    render() {
        const {isAuthenticated} = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                    Site
                </Link>
                <span className="navbar-text">
                    {isAuthenticated ? this.renderUser() : <Link to="/login">Sign in</Link>}
              </span>
            </nav>
        )
    }
}