import React, { Component } from 'react';

class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            sort : {
                key : 'name',
                value : 1
            }
         }
    }

    onClick = (key, value) => {
        this.setState({
            sort : {
                key : key,
                value : value
            }
        })
        this.props.handleSort(key, value);
    }

    render() { 
        const {key, value} = this.state.sort;
        console.log(key);
        console.log(value)
        return ( 
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" >
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)}>
                            <a role="button" className={(key === 'name' && value == 1) ? 'sort_selected' : ''}>
                                        <span className="fa fa-sort-alpha-asc pr-5">
                                            Tên A-Z
                                        </span>
                                    </a>
                        </li>
                        <li onClick={() => this.onClick('name', -1)} >
                            <a role="button" className={(key === 'name' && value == -1) ? 'sort_selected' : ''}>
                                        <span className="fa fa-sort-alpha-desc pr-5">
                                            Tên Z-A
                                        </span>
                                    </a>
                        </li>
                        <div class="dropdown-divider"></div>
                        <li onClick={() => this.onClick('status', 1)} ><a role="button" className={(key === 'status' && value == 1) ? 'sort_selected' : ''}>Trạng Thái Kích Hoạt</a></li>
                        <li onClick={() => this.onClick('status', -1)}><a role="button" className={(key === 'status' && value == -1) ? 'sort_selected' : ''}>Trạng Thái Ẩn</a></li>
                    </ul>
                </div>
            </div>
         );
    }
}
 
export default Sort;