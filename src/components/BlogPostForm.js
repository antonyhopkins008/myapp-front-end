import React from 'react'
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {canWriteBlogPost} from "../apiUtils";
import {Redirect} from "react-router";

const mapStateToProps = (state) => ({
    userData: state.auth.userData
});

const mapDispatchToProps = {};

class BlogPostForm extends React.Component {
    render() {

        if (!canWriteBlogPost(this.props.userData)) {
            return <Redirect to="/login"/>
        }

        return (
            <div>Blog post form</div>
        )
    }
}

export default reduxForm({
    form: 'BlogPostForm'
})(connect(mapStateToProps, mapDispatchToProps)(BlogPostForm))
