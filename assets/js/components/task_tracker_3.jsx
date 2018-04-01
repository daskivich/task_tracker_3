import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Nav from './nav';
import Home from './home';
import Feed from './feed';
import Users from './users';
import TaskEdit from './task-edit';

export default function task_tracker_3_init(store) {
  let root = document.getElementById('root');
  ReactDOM.render(<Provider store={store}><TaskTracker3 /></Provider>, root);
}

let TaskTracker3 = connect((state) => state)((props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Route path="/" exact={true} render={() =>
          <Home token={props.token} users={props.users} tasks={props.tasks} />
        } />
        <Route path="/users" exact={true} render={() =>
          <Users users={props.users} />
        } />
        <Route path="/users/:user_id" render={({match}) =>
          <Feed tasks={_.filter(props.tasks, (tt) => match.params.user_id == tt.user.id)}
            editable={true} />
        } />
        <Route path="/tasks/:task_id" render={({match}) =>
          <TaskEdit task={_.find(props.tasks, (tt) =>
            match.params.task_id == tt.task.id)
          } />
        } />
      </div>
    </Router>
  );
});
