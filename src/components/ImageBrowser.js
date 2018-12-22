import React from 'react'

export default class ImageBrowser extends React.Component {
    render() {
        const {images} = this.props;
        return (
            <div className="row mt-4 mb-4">
                {
                    images.map(image => {
                        return (
                            <div key={image.id} className="col-md-6 col-lg-4">
                                <div className="mt-2 mb-2">
                                    <img src={`http://localhost:2000/${image.url}`} alt="Upload" className="img-fluid"/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}