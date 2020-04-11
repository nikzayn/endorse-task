import React, { Component, Fragment } from 'react';

import axios from 'axios';
import _ from 'lodash';
import Fuse from 'fuse.js';

import List from '../List/List';

import './Filter.css';

const options = {
    isCaseSensitive: false,
    findAllMatches: false,
    includeMatches: false,
    includeScore: false,
    useExtendedSearch: false,
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    keys: [
        "name"
    ]
};

class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: {
                name: '',
                funding: false,
                state: '',
                district: '',
                city: ''
            },
            states: '',
            values: [],
            filteredValues: [],
        }
    }

    fuseIns;


    handleChange = (prop, value) => {
        const filter = Object.assign({}, this.state.filter, { [prop]: value });
        const filteredValues = this.filterData(this.state.values, filter);
        this.setState({
            filter,
            filteredValues,
        });

    }

    getList() {
        axios.get('http://localhost:8080/list')
            .then(response => {
                const results = response.data;
                this.fuseIns = new Fuse(results, options);

                this.setState({
                    values: results,
                    filteredValues: results,
                    states: _.chain(results)
                        .map(result => _.get(result, ['address', 'state']))
                        .uniq()
                        .value(),
                    district: _.chain(results)
                        .map(result => _.get(result, ['address', 'district']))
                        .uniq()
                        .value(),
                    city: _.chain(results)
                        .map(result => _.get(result, ['address', 'city']))
                        .uniq()
                        .value(),
                })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getList()
    }

    filterData(data, filter) {
        const items = this.fuseIns.search(filter.name).map(it => it.item._id);
        return data.filter(item => {
            let ok = true;
            for (let prop in filter) {
                if (prop === 'funding' && item['funding'] !== filter[prop] && filter[prop]) {
                    ok = false;
                } else if (prop === 'state' && _.get(item, ['address', 'state']) !== filter[prop] && filter[prop].length !== 0) {
                    ok = false;
                }
                else if (prop === 'district' && _.get(item, ['address', 'district']) !== filter[prop] && filter[prop].length !== 0) {
                    ok = false;
                }
                else if (prop === 'city' && _.get(item, ['address', 'city']) !== filter[prop] && filter[prop].length !== 0) {
                    ok = false;
                } else if (prop === 'name' && filter[prop].length > 0 && !items.includes(item._id)) {
                    ok = false;
                }
            }
            return ok;
        })
    }


    render() {
        const { funding, states, filter, district, city, name } = this.state;
        return (
            <Fragment>
                <div className="form-inline d-flex search-bar justify-content-center p-4">
                    {/* NGO Name */}
                    <input
                        className="form-control form-control-sm ml-3 col-md-4"
                        type="text"
                        placeholder="Search NGO name"
                        aria-label="Search"
                        value={name}
                        onChange={(e) => this.handleChange('name', e.target.value)}
                    />

                    {/* Funding Filter */}
                    <label className="container-checkbox">Funding
                        <input
                            className="m-2 form-control-lg"
                            style={{ display: 'none' }}
                            type="checkbox"
                            checked={funding}
                            onChange={() => { this.handleChange('funding', !this.state.filter.funding) }}
                        />
                        <span className="checkmark"></span>
                    </label>


                    {/* States Filter */}
                    <select className="ml-3 form-control-lg" value={filter.state} onChange={(e) => { this.handleChange('state', e.target.value) }}>
                        <option value="">States</option>
                        {_.map(states, data => (
                            <option key={data} value={data}>{data}</option>

                        ))}
                    </select>

                    {/* District Filter */}
                    <select className="ml-3 form-control-lg" value={filter.district} onChange={(e) => { this.handleChange('district', e.target.value) }}>
                        <option value="">Districts</option>
                        {_.map(district, data => (
                            <option key={data} value={data}>{data}</option>

                        ))}
                    </select>

                    {/* City Filter */}
                    <select className="ml-3 form-control-lg" value={filter.city} onChange={(e) => { this.handleChange('city', e.target.value) }}>
                        <option value="">Cities</option>
                        {_.map(city, data => (
                            <option key={data} value={data}>{data}</option>

                        ))}
                    </select>

                </div>
                <br />
                <br />
                <br />
                <List information={this.state.filteredValues} listUpdated={() => {
                    this.getList();
                }} />
            </Fragment>
        );
    }
}

export default Filter;