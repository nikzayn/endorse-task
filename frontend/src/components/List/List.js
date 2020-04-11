import React, { Fragment } from 'react';
import _ from 'lodash';

const List = ({ information }) => {
    return (
        <Fragment>
            <div className="container col-md-9">
                <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Logo</th>
                            <th scope="col">Name</th>
                            <th scope="col">Registration Date</th>
                            <th scope="col">Funding</th>
                            <th scope="col">E-Mail</th>
                            <th scope="col">Address - Line 1</th>
                            <th scope="col">Address - Line 2</th>
                            <th scope="col">City</th>
                            <th scope="col">District</th>
                            <th scope="col">State</th>
                            <th scope="col">Pincode</th>
                            <th scope="col">Claimed</th>
                            <th scope="col">Unclaimed</th>
                        </tr>
                    </thead>
                    <tbody>

                        {_.map(information, (val, index) => (
                            <tr key={index}>
                                <td>{val.logo}</td>
                                <td>{val.name}</td>
                                <td>{val.registration_date}</td>
                                <td>{val.foreign_funding_received ? 'Yes' : 'No'}</td>
                                <td>{val.email_id}</td>
                                <td>{_.get(val, ['address', 'line_1'])}</td>
                                <td>{_.get(val, ['address', 'line_2'])}</td>
                                <td>{_.get(val, ['address', 'city'])}</td>
                                <td>{_.get(val, ['address', 'district'])}</td>
                                <td>{_.get(val, ['address', 'state'])}</td>
                                <td>{_.get(val, ['address', 'pincode'])}</td>
                                <td>{val.claimed ? <button>VIEW PROFILE</button> : 'No'}</td>
                                <td>{val.unclaimed ? <button><a href="https://www.letsendorse.com/ngoForm" target="_blank">CLAIM</a></button> : 'No'}</td>
                            </tr>))}

                    </tbody>
                </table>
            </div >
        </Fragment >
    );
}

export default List;