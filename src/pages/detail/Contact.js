import React from 'react';
import MoreNav from './quicknavs/MoreNav';

const Chapters = () => {
    return (
        <div className='container main-header'>
            <div className="content-wrapper">
                <div className="content">
                    <h2 className='text-center'>Contact</h2>
                    <div className="card">
                        <div className="card-body">
                            <p className="card-text">
                                This is some text within a card body. You can use this space to provide an overview of the content.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="sidebar">
                    <MoreNav />
                </div>
            </div>
        </div>
    );
}

export default Chapters;
