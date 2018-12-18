import React from 'react';
import Message from "./Message";
import timeago from 'timeago.js';

class CommentList extends React.Component {
    render() {
        const {comments} = this.props;

        if (null == comments || 0 === comments.length) {
            return (<Message message="No comments yet"/>);
        }

        return (
            <div className="card mb-3 mt-3 shadow" key={comments.id}>
                {comments.map(comment => {
                    return (
                        <div className="card-body border-bottom" key={comment.id}>
                            <p className="card-text mb-0">
                                {comment.content}
                            </p>
                            <p className="card-text">
                                <small className="text-muted">
                                    {timeago().format(comment.published)}&nbsp;by&nbsp;{comment.author.name}
                                </small>
                            </p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default CommentList;