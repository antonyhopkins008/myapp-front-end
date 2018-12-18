import React from 'react';
import {Link} from "react-router-dom";
import timeago from 'timeago.js';
import Message from "./Message";

export default class BlogPost extends React.Component {
    render() {
        const {post} = this.props;
        console.log(post);
        if (null == post || 0 === post.length) {
            return (<Message message="Blog was not found"/>);
        }

        return (
            <div>
                <div className="card mb-3 mt-3 shadow-sm" key={post.id}>
                    <div className="card-body">
                        <h2>
                            <Link to={`/blog-posts/${post.id}`}>{post.title}</Link>
                        </h2>
                        <p className="card-text"> {post.content} </p>
                        <p className="card-text border-top">
                            <small className="text-muted">
                                {timeago().format(post.published)}&nbsp;by&nbsp;
                                {post.author.name}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}