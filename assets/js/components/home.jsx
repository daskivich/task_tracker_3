import React from 'react';
import { connect } from 'react-redux';

import UserNew from './user-new';
import TaskNew from './task-new';
import Feed from './feed';

// if the user hasn't yet logged in, displays a new user form
// if the user has logged in, displays a new task form and a list of all tasks
function Home(props) {
  if (props.users.length < 1) {
    return (
      <div>
        Please log in above or create an account below.
        <UserNew />
      </div>
    );
  } else {
    return (
      <div>
        <TaskNew />
        <h2>Tasks</h2>
        <Feed all_users={true} match_user_id={null}/>
      </div>
    );
  }
}

function state2props(state) {
  return {
    users: state.users
  };
}

export default connect(state2props)(Home);
