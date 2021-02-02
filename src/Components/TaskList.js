import React, { Component } from 'react';
import TaskItem from './TaskItem';
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            filterName : '',
            filterStatus : -1,
            tasks : []
         }

    }

    changeStatus = (id) => 
    {
        this.props.changeStatus(id)

    }

    deleteTask = (id) => {
        this.props.deleteTask(id);
    }

    updateTask = (id) => {
        this.props.updateTask(id);
    }

    handleChange = (event) => {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.onFilter(
        name === 'filterName' ? value : this.state.filterName,
        name === 'filterStatus' ? value : this.state.filterStatus
    )
    this.setState({
      [name]: value
    });

   
    }

    render() { 
       const {tasks} = this.props;
       console.log(tasks)
        return ( 
            <table className="table table-bordered table-hover mt-5">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input type="text" className="form-control" value={this.state.searchName} onChange={this.handleChange} name="filterName"/>
                    </td>
                    <td>
                        <select className="form-control" value={this.state.searchStatus} name="filterStatus" onChange={this.handleChange}>
                            <option value="-1">Tất Cả</option>
                            <option value="0">Ẩn</option>
                            <option value="1">Kích Hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                {
                    tasks.map((task, index) => <TaskItem 
                    task= {task}
                     key={task.id}
                      changeStatus={this.changeStatus}
                       deleteTask={this.deleteTask}
                       updateTask = {this.updateTask}
                       />)
                }
                
            </tbody>
        </table>
         );
    }
}
 
export default TaskList;