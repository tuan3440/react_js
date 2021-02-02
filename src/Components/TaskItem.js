import React, { Component } from 'react';

class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    changeStatus = () => {
        this.props.changeStatus(this.props.task.id)
        console.log("task item", this.props.task.id)
    }

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    }

    updateTask = () => {
        this.props.updateTask(this.props.task.id);
    }

    render() { 
        const {task} = this.props;
        return ( 
            <tr>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td className="text-center">
                        {task.status == 1? (
                        <button className="btn btn-success" onClick={this.changeStatus}>
                              Kích Hoạt
                        </button>
                        ) : (
                            <button className="btn btn-warning" onClick={this.changeStatus}>
                            An
                        </button>
                        )}
                       
                    </td>
                    <td className="text-center">
                        <button type="button" className="btn btn-warning" onClick={this.updateTask}>
                            <span className="fa fa-pencil mr-5"></span>Sửa
                        </button>
                        &nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.deleteTask}>
                            <span className="fa fa-trash mr-5"></span>Xóa
                        </button>
                    </td>
                </tr>
         );
    }
}
 
export default TaskItem;