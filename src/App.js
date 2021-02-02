import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from './Components/TaskForm';
import Control from './Components/Control';
import TaskList from './Components/TaskList';
import _ from 'lodash';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      tasks : [
        {
          id : 1,
          name : 'code php',
          status : 0
        },
        {
          id : 2,
          name : 'code php',
          status : 1
        }
      ],
      isDisplayForm: false,
      isEditForm : {},
      filter : {
        name : '',
        status : -1
      },
      keyword : '',
      sort : {
        by : 'name',
        value : 1
      }
     }
}

  componentWillMount()
  {
    const tasks = localStorage.getItem("tasks");

      if(tasks) {
        this.setState({
          tasks : JSON.parse(tasks)
        });
      }
  }

    displayForm = () => 
    {
      this.setState(
        {
          isDisplayForm : !this.state.isDisplayForm,
          isEditForm : null
        }
      )
      
    }

    editForm = (task) => {

      this.setState({
        isEditForm : task
      })

    }

    findIndex = (id) => {
      var {tasks} = this.state;
      var result = -1;
      tasks.forEach((task, index) => {
           if (task.id === id) {
             result = index;
           }
      })
      return result;
    }

    addListTask = (task) => {
      var {tasks} = this.state;
      var id = task.id;
      // var index = this.findIndex(id);
     var index = _.findIndex(tasks, function(task) {
       return task.id == id
     })

     console.log("index", index)
      if(index != -1) {
     
          tasks[index] = task;
      
      } else {
        var obj = {
          id: task.id,
          name : task.name,
          status : parseInt(task.status)
        }
     
        //c1
        tasks.push(obj)
      }


      
      this.setState({
        tasks: tasks
      });
      // c2
      // this.setState({
      //   tasks : [...tasks, obj]
      // });

      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }

    changeStatus = (id) => {

      var {tasks} = this.state;
      tasks.forEach((task, index) => {
           if(task.id === id) {
               task.status === 1 ? task.status = 0 : task.status = 1;
           }
      })

      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }

    deleteTask = (id) => {
      
      const taskUpdate = this.state.tasks.filter(task => task.id !== id);

      this.setState({
        tasks : taskUpdate
      });
      var a;
      var b;

      localStorage.setItem('tasks', JSON.stringify(taskUpdate));
      this.displayForm();
    }

    updateTask = (id) => {

      const task = this.state.tasks.filter(task => task.id === id);

      if (this.state.isDisplayForm === false) 
      {
        this.displayForm();
      }
      this.editForm(task[0]);
    }

    onFilter = (name, status) => {
      status = parseInt(status)
      this.setState({
        filter : {
          name : name,
          status : status
        }
      })


    }

    handleSearch = (keyword) => {
      this.setState({
        keyword : keyword
      })
      console.log(this.state.keyword)
    }

    handleSort = (key, value) => {
      this.setState({
        sort : {
          by : key,
          value : value
        }
      })
      console.log(key);
      console.log(value);
    }

  render() {
    var {tasks, isDisplayForm, filter, keyword, sort} = this.state;
    console.log(keyword)
    if (filter) {
      if(filter.name) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        })
      }

      if (filter.status !== -1) {
        tasks = tasks.filter(task => {
          return task.status === filter.status
        })
      }
    }

    if (keyword) {
      
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      })
    }

    if (sort) {
      if ( sort.by === 'name') {
        tasks.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return sort.value == 1 ? -1 : 1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return sort.value == 1 ? 1 : -1;
          }
          return 0;
        });
      }
      else {
        tasks.sort((a, b) => {
          if (a.status < b.status) {
            return sort.value == 1 ? 1 : -1;
          }
          if (a.status > b.status) {
            return sort.value == 1 ? -1 : 1;
          }
          return 0;
        });
      }
    }


    return (
      <div className="container">
          <div className="text-center">
              <h1>Quản Lý Công Việc</h1>
              <hr/>
          </div>
          <div className="row">
            {isDisplayForm && (<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <TaskForm addListTask = {this.addListTask} displayForm={this.displayForm} isEditForm={this.state.isEditForm}/>
              </div>)}
              
              <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"} >
                  <button type="button" className="btn btn-primary" onClick={this.displayForm}>
                      <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                  </button>
                 <Control handleSearch={this.handleSearch} handleSort={this.handleSort}/>
                  <div className="row mt-15">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                         <TaskList tasks={tasks}
                          changeStatus={this.changeStatus}
                           deleteTask={this.deleteTask}
                           updateTask={this.updateTask}
                           onFilter = {this.onFilter}
                           />
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
  
}

export default App;
