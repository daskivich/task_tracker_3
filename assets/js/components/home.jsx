import React from 'react';

import TaskNew from './task-new';
import Feed from './feed';

export default function Home(props) {
  if (props.current_user == null) {
    return (
      <div>
        // log-in and account-creation functionality
      </div>
    );
  } else {
    return (
      <div>
        <TaskNew users={props.users} />
        <Feed tasks={props.tasks} editable={false} />
      </div>
    );
  }
}
