import React, { Component, Fragment } from 'react';
import { Modal } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';

class Form extends Component {

    submitForm = (e) => {
        e.preventDefault();
        const { result } = this.props;
        axios.post('http://localhost:8080/claim', result)
            .then(() => console.log('Form Submitted'))
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const { toggleForm, toggleChangeForm, updateVal, result } = this.props;
        return (
            <Fragment>
                <Modal isOpen={toggleForm} toggle={toggleChangeForm} className='modal-lg modal-dialog-centered'>
                    <div className="m-5 p-5">
                        <div className="text-center justify-content-center align-items-center">
                            <form onSubmit={this.submitForm}>
                                <div className="form-group">
                                    <label htmlFor="Logo">Logo</label>
                                    <input type="text"
                                        className="form-control"
                                        id="logo"
                                        aria-describedby="logo"
                                        placeholder="Enter logo"
                                        value={result.logo}
                                        onChange={updateVal}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ngo-name">NGO Name</label>
                                    <input type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Ngo Name"
                                        value={result.name}
                                        onChange={updateVal}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registration_date">Registration Date</label>
                                    <input type="date"
                                        className="form-control"
                                        id="registration_date"
                                        value={moment(result.registration_date, 'DD-MM-YYYY').format("YYYY-MM-DD")}
                                        onChange={updateVal}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="funding">Foreign Funding Recieved</label>
                                    <input type="checkbox"
                                        className="form-control"
                                        id="funding"
                                        checked={result.funding}
                                        onChange={updateVal}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">E-Mail</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="email id"
                                        value={result.email_id}
                                        onChange={updateVal}
                                    />
                                </div>
                                <div className="form-group">
                                    <h2>Address:</h2>
                                    <label htmlFor="line_1">Line 1</label>
                                    <input type="text" className="form-control" id="line_1" placeholder="Line 1" value={result.address.line_1} onChange={updateVal} />
                                    <label htmlFor="line_2">Line 2</label>
                                    <input type="text" className="form-control" id="line_2" placeholder="Line 2" value={result.address.line_2} onChange={updateVal} />
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="form-control" id="city" placeholder="City" value={result.address.city} onChange={updateVal} />
                                    <label htmlFor="district">District</label>
                                    <input type="text" className="form-control" id="district" placeholder="District" value={result.address.district} onChange={updateVal} />
                                    <label htmlFor="state">State</label>
                                    <input type="text" className="form-control" id="state" placeholder="State" value={result.address.state} onChange={updateVal} />
                                    <label htmlFor="pincode">Pincode</label>
                                    <input type="text" className="form-control" id="pincode" placeholder="Pincode" value={result.address.pincode} onChange={updateVal} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

export default Form;