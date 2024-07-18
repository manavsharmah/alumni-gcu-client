import React from 'react';
import AboutNav from './quicknavs/AboutNav';

const Vision = () => {
    return (
        <div className='container main-header'>
            <div className="content-wrapper">
                <div className="content">
                    <h2 className='text-center'>Vision</h2>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Card Title</h5>
                            <p className="card-text">
                                This is some text within a card body. You can use this space to provide an overview of the content.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="sidebar">
                    <AboutNav />
                </div>
            </div>
        </div>
    );
}

export default Vision;
