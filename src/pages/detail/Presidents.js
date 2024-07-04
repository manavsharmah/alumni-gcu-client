import React from 'react';

const Presidents = () => {
    return (
        <div className='container d-flex align-items-center justify-content-center min-vh-20'>
            <div>
                <div className="row justify-content-center mt-4">
                    <div className="col-md-8">
                        <h2 className='text-center'>Past Presidents</h2>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">List of Past Presidents</h5>
                                <table className="table table-bordered mt-3">
                                    <thead>
                                        <tr>
                                            <th scope="col">SL No</th>
                                            <th scope="col" align='center'>Name and Address</th>
                                            <th scope="col">Year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                        {/* Add more rows as needed */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Presidents;