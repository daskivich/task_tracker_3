import React from 'react';
import Task from './task';

export default function Feed(params) {
  var tasks;

  if (params.editable) {
    tasks = _.map(params.tasks, (tt) => <Task key={tt.id} task={tt} editable={true} />);

  } else {
    tasks = _.map(params.tasks, (tt) => <Task key={tt.id} task={tt} editable={false} />);
  }

  return <div>
    {tasks}
  </div>;
}
