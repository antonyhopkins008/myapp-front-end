import React from 'react'
import {Field, reduxForm} from 'redux-form';
import {canWriteBlogPost} from "../apiUtils";
import {Redirect} from "react-router";
import {renderField} from "../form";
import {connect} from "react-redux";
import {blogPostAdd} from "../actions/actions";
import ImageUpload from "./ImageUpload";
import ImageBrowser from "./ImageBrowser";

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
    ...state.blogPostForm
});

const mapDispatchToProps = {
    blogPostAdd,
};

class BlogPostForm extends React.Component {
    onSubmit(values) {
        const {blogPostAdd, reset, history} = this.props;

        return blogPostAdd(values.title, values.content)
            .then(() => {
                reset();
                history.push('/');
            });
    }

    render() {

        if (!canWriteBlogPost(this.props.userData)) {
            return <Redirect to="/login"/>
        }

        const {submitting, handleSubmit, error, images, isImageUploading} = this.props;

        return (
            <div className="card mt-3 md-6 shadow-sm">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="title" label="Title" type="text" component={renderField}/>
                        <Field name="content" label="Content" type="textarea" component={renderField}/>
                        <ImageUpload/>
                        <ImageBrowser images={images}/>
                        <button type="submit" className="btn btn-primary btn-big btn-block"
                                disabled={submitting || isImageUploading}>
                            Publish
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'BlogPostForm'
})(connect(mapStateToProps, mapDispatchToProps)(BlogPostForm))
