import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../api';

function TaskEdit(props) {
  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_EDIT_TASK_FORM',
      data: data
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    let data = {
      token: props.token.token,
      task_params: {
        id: props.edit_task_form.id,
        time_invested: parseInt(props.edit_task_form.time_invested, 10),
        completed: props.edit_task_form.completed
      }
    };

    api.update_task(data);
    console.log(data);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_EDIT_TASK_FORM'
    });
  }

  let increments = _.range(0, 10080, 15);
  let options = _.map(increments, (ii) => <option key={ii}>{ii}</option>);
  let cancel_path = "/users/" + props.token.user_id;

  return <div style={{padding: "4ex"}}>
    <h2>Edit Task</h2>
    <FormGroup>
      <Label for="id">Task ID</Label>
      <Input plaintext>{props.edit_task_form.id}</Input>
    </FormGroup>
    <FormGroup>
      <Label for="user_id">User</Label>
      <Input plaintext>{props.edit_task_form.user_id}</Input>
    </FormGroup>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input plaintext>{props.edit_task_form.title}</Input>
    </FormGroup>
    <FormGroup>
      <Label for="title">Description</Label>
      <Input plaintext>{props.edit_task_form.description}</Input>
    </FormGroup>
    <FormGroup>
      <Label for="time_invested">Time Invested (in minutes)</Label>
      <Input type="select" name="time_invested" value={props.edit_task_form.time_invested} onChange={update}>
        {options}
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="completed">Task Completed</Label>
      <Input className="ml-3" type="checkbox" name="completed" value={props.edit_task_form.completed} onChange={update}/>
    </FormGroup>
    <Button onClick={submit} color="primary">Update Task</Button>
    <Link to={cancel_path} onClick={clear}>Cancel</Link>
  </div>;
}

function state2props(state) {
  console.log("rerender@TaskEdit", state);
  return {
    edit_task_form: state.edit_task_form,
    token: state.token
  };
}

export default connect(state2props)(TaskEdit);
