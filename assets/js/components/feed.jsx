import React from 'react';
import Task from './task';
import { connect } from 'react-redux';

function Feed(props) {
  var tasks;
  var all_users = props.all_users;

  if (props.token == null) {
    return <div>Please log in.</div>
  }

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
