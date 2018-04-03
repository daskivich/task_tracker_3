import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Task(props) {
  let task = props.task;

  let shared_elements =
    <span>
      <p>{task.title}</p>
      <p>Assigned to <b>{task.user.name}</b></p>
      <p>{task.description}</p>
      <p>Time invested (in minutes): {task.time_invested}</p>
      <p>Completed: {task.completed}</p>
    </span>;

  if (props.editable) {
    return <Card>
      <CardBody>
        <div>
          {shared_elements}
          <p><Link to={"/tasks/" + props.task.id}>edit</Link></p>
        </div>
      </CardBody>
    </Card>;
  } else {
    return <Card>
      <CardBody>
        <div>
          {shared_elements}
        </div>
      </CardBody>
    </Card>;
  }
}
