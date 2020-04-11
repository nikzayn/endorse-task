import React, { Component, Fragment } from 'react';
import _ from 'lodash';

import Form from '../Form/Form';

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleForm: false,
            toggleProfile: false,
            formData: [],
            value: '',
            updateClaim: false,
        }
    }

    //Modal form
    toggleChangeForm = (val, updateClaim) => {
        this.setState({
            toggleForm: !this.state.toggleForm,
            formData: val,
            updateClaim,
        })
    }

    dismiss = () => {
        this.setState({
            toggleForm: false,
        })
    }


    formChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        const { information } = this.props;
        const isDesktop = window.innerWidth > 500 ? true : false;
        return (
            <Fragment>
                <div className="container center">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Logo</th>
                                <th scope="col">Name</th>
                                {isDesktop && (<th scope="col">Registration Date</th>)}
                                <th scope="col">Claimed</th>
                            </tr>
                        </thead>
                        <tbody>

                            {_.map(information, (val) => (
                                <tr key={val._id}>
                                    <td><img src={val.logo} alt={val.logo} style={{ width: '55px', height: '50px' }} /></td>
                                    <td>{val.name}</td>
                                    {isDesktop && (<td>{val.registration_date}</td>)}
                                    <td>
                                        {!val.claimed ?
                                            <button className="btn btn-primary" onClick={() => { this.toggleChangeForm(val, true); }}>CLAIM</button>
                                            :
                                            <button className="btn btn-warning" onClick={() => { this.toggleChangeForm(val, false); }}>VIEW PROFILE</button>
                                        }
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>
                    {
                        this.state.toggleForm ?
                            <Form
                                toggleForm={this.state.toggleForm}
                                toggleChangeForm={this.toggleChangeForm}
                                updateVal={this.formChange}
                                result={{ formData: this.state.formData, updateClaim: this.state.updateClaim }}
                                submitted={() => {
                                    this.props.listUpdated()
                                    this.dismiss();
                                }}
                                dismiss={this.dismiss}
                            /> :
                            null
                    }
                </div >
            </Fragment >
        );
    }
}

export default List;