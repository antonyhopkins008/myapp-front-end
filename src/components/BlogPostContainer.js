import React from 'react';
import {blogPostFetch} from "../actions/actions";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state.blogPost
});

const mapDispatchToProps = ({
    blogPostFetch
});

class BlogPostContainer extends React.Component {
    componentDidMount() {
        this.props.blogPostFetch(this.props.match.params.id).then(response => console.log(this.props));
    }

    render() {
        return (
            <div>Blog Post</div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogPostContainer);