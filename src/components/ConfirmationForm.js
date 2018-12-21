import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {renderField} from "../form";

class ConfirmationForm extends React.Component {
    onSubmit(values) {
        console.log(values);
    }

    render() {
        const {handleSubmit, submitting} = this.props;

        return (
            <div className="card mt-3 md-6 shadow-sm">
                <div className="card-body">
                    <p className="card-text">
                        Please, confirm your registration with token in your email
                    </p>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="confirmationToken" label="Confirmation token" type="text" component={renderField}/>
                        <button type="submit" className="btn btn-primary btn-big btn-block"
                                disabled={submitting}>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'ConfirmationForm'
})(ConfirmationForm)