import React from 'react';
import { connect } from 'react-redux';

import UserNew from './user-new';
import TaskNew from './task-new';
import Feed from './feed';

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
