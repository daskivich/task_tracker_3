import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../api';

function TaskEdit(props) {
  if (props.token == null) {
    return <div>Please log in.</div>
  }

  function update(ev) {
    let tgt = $(ev.target);
    let attr = tgt.attr('name');
    let val = tgt.val();

    console.log("target attr", attr);
    console.log("target val", val);

    let data = {};

    if (attr == "completed") {
      if (val == "true") {
        val = true;
      } else {
        val = false;
      }
    }

    data[attr] = val;

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
  let path = "/users/" + props.token.user_id;
  let complete;
  let incomplete;

  if (props.edit_task_form.completed) {
    complete = true;
    incomplete = false;
  } else {
    complete = false;
    incomplete = true;
  }

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
    <FormGroup tag="fieldset">
      Status
      <FormGroup check>
        <Label check>
          <Input type="radio" name="completed" value="true" checked={complete} onChange={update} />{' '}
          complete
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="completed" value="false" checked={incomplete} onChange={update} />{' '}
          incomplete
        </Label>
      </FormGroup>
    </FormGroup>
    <Link to={path} onClick={submit} color="primary">Submit Changes</Link>
    <Link to={path} onClick={clear}>Cancel</Link>
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
