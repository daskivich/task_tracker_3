import React from 'react';

import TaskNew from './task-new';
import Feed from './feed';

export default function Home(props) {
  if (props.token == null) {
    return (
      <div>
        please log in
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
