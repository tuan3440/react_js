import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    handleSearch = (keyword) => {
        console.log("keyword",keyword)

        this.props.handleSearch(keyword)
    }

    handleSort = (key, value) => {
        this.props.handleSort(key, value)
    }
    render() { 
        return ( 
        <div className="row mt-15">
            <Search handleSearch={this.handleSearch}/>
            <Sort handleSort={this.handleSort}/>        
        </div>
         );
    }
}
 
export default Control;