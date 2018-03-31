import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

function TaskNew(params) {
  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_NEW_TASK_FORM',
      data: data
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    api.submit_task(props.new_task_form);
    console.log(props.new_task_form);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_NEW_TASK_FORM'
    });
  }

  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{padding: "4ex"}}>
    <h2>New Task</h2>
    <FormGroup>
      <Label for="user_id">User</Label>
      <Input type="select" name="user_id" value={params.new_task_form.user_id} onChange={update}>
        <option></option>
        {users}
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input name="title" value={params.new_task_form.user_id} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="description">Description</Label>
      <Input type="textarea" name="description" value={params.new_task_form.user_id} onChange={update} />
    </FormGroup>
    <Button onClick={submit} color="primary">Create Task</Button>
    <Button onClick={clear} color="secondary">Clear Form</Button>
  </div>;
}

function state2props(state) {
  console.log("rerender@TaskNew", state);
  return {
    new_task_form: state.new_task_form,
    users: state.users,
  };
}

export default connect(state2props)(TaskNew);
