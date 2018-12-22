import React from 'react'
import {connect} from 'react-redux';
import {imageUpload} from "../actions/actions";

const mapDispatchToProps = {
    imageUpload
};

class ImageUpload extends React.Component {
    onChange(e) {
        const file = e.target.files[0];
        this.props.imageUpload(file);
    }

    render() {
        return (
            <div className="form-group">
                <input type="file"
                       onChange={this.onChange.bind(this)}
                       className="form-control-file text-primary font-weight-bold"
                />
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(ImageUpload)