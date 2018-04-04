import React from 'react';
import Task from './task';
import { connect } from 'react-redux';

// a list of tasks
// if the "all_users" prop is passed as true,
// the list includes tasks assigned to all users
// if the "all_users" prop is passed as false,
// the list includes only tasks assigned
// to the user specified by the match_user_id prop
// if the matching user is the current user,
// an edit link is included with each task
function Feed(props) {
  if (props.token == null) {
    return <div>Please log in.</div>
  }

  var tasks;
  var all_users = props.all_users;
  var current_user = props.match_user_id == props.token.user_id;

  if (all_users) {
    tasks = _.map(props.tasks, (tt) => <Task key={tt.id} task={tt} editable={false} />);
  } else {
    tasks = _.filter(props.tasks, (tt) => tt.user.id == props.match_user_id);

    if (current_user) {
      tasks = _.map(tasks, (tt) => <Task key={tt.id} task={tt} editable={true} />);
    } else {
      tasks = _.map(tasks, (tt) => <Task key={tt.id} task={tt} editable={false} />);
    }
  }

  return <div>
    {tasks}
  </div>;
}

function state2props(state) {
  return {
    tasks: state.tasks,
    token: state.token
  };
}

export default connect(state2props)(Feed);
