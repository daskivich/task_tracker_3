import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Nav from './nav';
import Home from './home';
import Feed from './feed';
import Users from './users';
import TaskEdit from './task-edit';
import UserEdit from './user-edit';

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
          <Home />
        } />
        <Route path="/users" exact={true} render={() =>
          <Users />
        } />
        <Route path="/users/edit/:user_id" render={() =>
          <UserEdit />
        } />
        <Route path="/users/:user_id" render={({match}) =>
          <Feed all_users={false} match_user_id={match.params.user_id} />
        } />
        <Route path="/tasks/:task_id" render={() =>
          <TaskEdit />
        } />
      </div>
    </Router>
  );
});
