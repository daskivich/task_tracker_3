import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';

export default function TaskEdit(params) {
  let increments = _.range(0, 10080, 15);
  let task = params.task;

  return <div style={{padding: "4ex"}}>
    <h2>Edit Task</h2>
    <FormGroup>
      <Label for="user_id">User</Label>
      <Input plaintext>{task.user.name}</Input>
    </FormGroup>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input plaintext>{task.title}<Input />
    </FormGroup>
    <FormGroup>
      <Label for="title">Description</Label>
      <Input plaintext>{task.description}</Input>
    </FormGroup>
    <FormGroup>
      <Label for="time_invested">Time Invested (in minutes)</Label>
      <Input type="select" name="time_invested">
        {increments}
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="completed">Task Completed</Label>
      <Input type="checkbox" name="completed" />
    </FormGroup>
    <Button onClick={() => alert("TODO: Manage State")}>Update Task</Button>
  </div>;
}
