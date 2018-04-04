import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Task(props) {
  let task = props.task;

  let status;

  if (task.completed) {
    status = "complete";
  } else {
    status = "incomplete";
  }

  let shared_elements =
    <span>
      <p>{task.title}</p>
      <p>Assigned to <b>{task.user.name}</b></p>
      <p>{task.description}</p>
      <p>Time invested (in minutes): {task.time_invested}</p>
      <p>Status: {status}</p>
    </span>;

  function select(ev) {
    let data = {
      id: task.id,
      user_id: task.user.id,
      title: task.title,
      description: task.description,
      time_invested: task.time_invested,
      completed: task.completed
    };

    props.dispatch({
      type: 'SELECT_TASK_FOR_EDITING',
      data: data
    });
  }

  if (props.editable) {
    return <Card>
      <CardBody>
        <div>
          {shared_elements}
          <p><Link to={"/tasks/" + props.task.id} onClick={select}>edit</Link></p>
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

function state2props(state) {
  return {};
}

export default connect(state2props)(Task);
