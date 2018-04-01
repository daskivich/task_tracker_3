import React from 'react';
import { connect } from 'react-redux';

import TaskNew from './task-new';
import Feed from './feed';

function Home(props) {
  if (props.users.length < 1) {
    return (<div>Please log in.</div>);
  } else {
    return (
      <div>
        <TaskNew />
        <Feed tasks={props.tasks} editable={false} />
      </div>
    );
  }
}

function state2props(state) {
  return {
    token: state.users
  };
}

export default connect(state2props)(Home);
