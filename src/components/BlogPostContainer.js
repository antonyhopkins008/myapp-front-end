import React from 'react';
import {blogPostFetch, blogPostUnload} from "../actions/actions";
import {connect} from "react-redux";
import BlogPost from "./BlogPost";
import Spinner from "./Spinner";

const mapStateToProps = state => ({
    ...state.blogPost
});

const mapDispatchToProps = ({
    blogPostFetch,
    blogPostUnload
});

class BlogPostContainer extends React.Component {
    componentDidMount() {
        this.props.blogPostFetch(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.blogPostUnload();
    }

    render() {
        const {isFetching, post} = this.props;

        if (isFetching) {
            return (<Spinner/>);
        }

        return (
            <BlogPost isFetching={isFetching} post={post}/>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogPostContainer);