import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id : Math.floor(Math.random() * 1000),
            name : '',
            status : 1
         }
    }

    componentWillMount() 
    {
         if(this.props.isEditForm) {
              const task = this.props.isEditForm;
              console.log("aa", this.props.isEditForm)
              this.setState({
                  id : task.id,
                  name : task.name,
                  status : task.status
              })
              console.log(task.id);
         }
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
        if(nextProps && nextProps.isEditForm) {
            
            this.setState({
                id : nextProps.isEditForm.id,
                name : nextProps.isEditForm.name,
                status : nextProps.isEditForm.status
            })
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    addTask = (e) => {
        e.preventDefault();
        this.props.addListTask(this.state);
    }

    cancelTask = (e) => {
        e.preventDefault();
        this.setState({
            name : '',
            status : 1
        })
        this.props.displayForm();
    }

    render() { 
        const {name, status} = this.state;
        // const isEditForm = this.props.isEditForm;
        // console.log("xx", isEditForm.name);
        // console.log("ss", isEditForm.name);
        return ( 
            <div className="panel panel-warning">
            <div className="panel-heading">
        <h3 className="panel-title">{this.props.isEditForm ? "SuaCV" : "ThemCV"}</h3>
            </div>
            <div className="panel-body">
                <form>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input type="text" className="form-control" value={name} onChange={this.handleChange} name="name"/>
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control" required="required" value={status} onChange={this.handleChange} name="status">
                        <option value="1">Kích Hoạt</option>
                        <option value="0">Ẩn</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning" onClick={this.addTask}>{this.props.isEditForm ? "Sua" : "Them"}</button>&nbsp;
                        <button type="submit" className="btn btn-danger" onClick={this.cancelTask}>Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
         );
    }
}
 
export default TaskForm;