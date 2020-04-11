import React, { Fragment } from 'react';
import { Modal } from 'reactstrap';
import _ from 'lodash';

const Profile = ({ toggleProfile, toggleChangeProfile, details }) => {
    return (
        <Fragment>
            <Modal isOpen={toggleProfile} toggle={toggleChangeProfile} className='modal-lg modal-dialog-centered'>
                <h2 className="d-flex justify-content-center mt-3">Profile</h2>
                <div className="p-4">
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
                            </tr>
                        </thead>
                        <tbody>

                            {_.map(details, (val) => (
                                <tr key={val._id}>
                                    <td><img src={val.logo} alt={val.logo} style={{ width: '55px', height: '50px' }} /></td>
                                    <td>{val.name}</td>
                                    <td>{val.registration_date}</td>
                                    <td>{val.funding ? 'Yes' : 'No'}</td>
                                    <td>{val.email_id}</td>
                                    <td>{_.get(val, ['address', 'line_1'])}</td>
                                    <td>{_.get(val, ['address', 'line_2'])}</td>
                                    <td>{_.get(val, ['address', 'city'])}</td>
                                    <td>{_.get(val, ['address', 'district'])}</td>
                                    <td>{_.get(val, ['address', 'state'])}</td>
                                    <td>{_.get(val, ['address', 'pincode'])}</td>
                                    <td>{val.claimed ? 'Yes' : 'No'}</td>
                                </tr>))}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </Fragment>
    );
}

export default Profile;