import React, { Component, Fragment } from 'react';
import _ from 'lodash';

import Form from '../Form/Form';
import Profile from '../Profile/Profile';

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleForm: false,
            toggleProfile: false,
            formData: [],
            value: '',
        }
    }

    //Modal form
    toggleChangeForm = () => {
        this.setState({
            toggleForm: !this.state.toggleForm
        })
    }

    //Modal Profile
    toggleChangeProfile = () => {
        this.setState({
            toggleProfile: !this.state.toggleProfile
        })
    }

    formChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    formSelect = (val) => {
        this.setState(prevState => Object.assign({}, prevState, {
            formData: val
        }))
    }

    render() {
        const { information } = this.props;
        return (
            <Fragment>
                <div className="container center">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Logo</th>
                                <th scope="col">Name</th>
                                <th scope="col">Registration Date</th>
                                <th scope="col">Claimed</th>
                            </tr>
                        </thead>
                        <tbody>

                            {_.map(information, (val, index) => (
                                <tr key={index} onClick={() => (this.formSelect(val))}>
                                    <td><img src={val.logo} style={{ width: '55px', height: '50px' }} /></td>
                                    <td>{val.name}</td>
                                    <td>{val.registration_date}</td>
                                    <td>
                                        {!val.claimed ?
                                            <button class="btn btn-primary" onClick={() => { this.toggleChangeForm(); this.formSelect(val); }}>CLAIM</button>
                                            :
                                            <button class="btn btn-warning" onClick={() => { this.toggleChangeProfile(); }}>VIEW PROFILE</button>
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
                                result={this.state.formData}
                            /> :
                            null
                    }
                    {
                        this.state.toggleProfile ?
                            <Profile
                                toggleProfile={this.state.toggleProfile}
                                toggleChangeProfile={this.toggleChangeProfile}
                                details={this.props.information}
                            /> :
                            null
                    }
                </div >
            </Fragment >
        );
    }
}

export default List;