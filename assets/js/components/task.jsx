import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Task(params) {
  let task = params.task;

  if (params.editable) {
    return <Card>
      <CardBody>
        <div>
          <p>{task.title}</p>
          <p>Assigned to <b>{task.user.name}</b></p>
          <p>{task.description}</p>
          <p>Time invested (in minutes): {task.time_invested}</p>
          <p>Completed: {task.completed}</p>
          <p><Link to={"/tasks/" + params.task.id}>edit</Link></p>
        </div>
      </CardBody>
    </Card>;
  } else {
    return <Card>
      <CardBody>
        <div>
          <p>{task.title}</p>
          <p>Assigned to <b>{task.user.name}</b></p>
          <p>{task.description}</p>
          <p>Time invested (in minutes): {task.time_invested}</p>
          <p>Completed: {task.completed}</p>
        </div>
      </CardBody>
    </Card>;
  }
}
