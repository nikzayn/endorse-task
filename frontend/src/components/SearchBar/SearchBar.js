import React, { Component } from 'react';

class SearchBar extends Component {
    render() {
        return (
            <div>
                <form class="form-inline d-flex justify-content-center md-form form-sm mt-3">
                    <i class="fas fa-search" aria-hidden="true"></i>
                    <input class="form-control form-control-sm ml-3 w-50" type="text" placeholder="Search"
                        aria-label="Search" />
                </form>
            </div>
        );
    }
}

export default SearchBar;