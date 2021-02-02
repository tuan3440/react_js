import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            keyword : ''
         }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
          });
        // this.props.handleSearch(value);
    }

    handleSearch = () => {
        // console.log("keyword",this.state.keyword)
        this.props.handleSearch(this.state.keyword)
    }
    render() { 
        return ( 
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Nhập từ khóa..." value={this.state.keyword} name="keyword" onChange={this.handleChange}/>
                <span className="input-group-btn">
                            <button className="btn btn-primary" type="button" onClick={this.handleSearch}>
                                <span className="fa fa-search mr-5"></span>Tìm
                </button>
                </span>
            </div>
        </div>
         );
    }
}
 
export default Search;