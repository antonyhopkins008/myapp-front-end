import React from 'react';
import BlogPostList from "./BlogPostList";
import {blogPostList, blogPostListAdd} from "../actions/actions";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state.blogPostList
});

const mapDispatchToProps = ({
    blogPostList,
    blogPostListAdd
});

class BlogPostListContainer extends React.Component {
    componentDidMount() {
        console.log(this.props);
        this.props.blogPostList();
    }

    render() {
        console.log(this.props.posts);
        return (
            <BlogPostList posts={this.props.posts}/>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogPostListContainer);