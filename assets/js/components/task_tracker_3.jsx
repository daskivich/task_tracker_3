import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
import Feed from './feed';
import Users from './users';
import TaskForm from './task-form';

export default function task_tracker_3_init() {
  let root = document.getElementById('root');
  ReactDOM.render(<TaskTracker3 />, root);
}

class TaskTracker3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      users: [],
      current_user: null
    };

    this.request_tasks();
    this.request_users();
  }

  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        this.setState(_.extend(this.state, { tasks: resp.data }));
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        this.setState(_.extend(this.state, { users: resp.data }));
      },
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav current_user={this.state.current_user}/> // mimics page loads
          <Route path="/" exact={true} render={() =>
            <Home current_user={this.state.current_user} users={this.state.users} tasks={this.state.tasks} />
          } />
          <Route path="/users" exact={true} render={() =>
            <Users users={this.state.users} />
          } />
          <Route path="/users/:user_id" render={({match}) =>
            <Feed tasks={_.filter(this.state.tasks, (tt) =>
              match.params.user_id == tt.user.id )
            } />
          } />
        </div>
      </Router>
    );
  }
}
