import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

// form to create a new task
function TaskNew(props) {
  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_NEW_TASK_FORM',
      data: data
    };
    props.dispatch(action);
  }

  function submit(ev) {
    let data = {
      token: props.token.token,
      task_params: props.new_task_form
    };

    api.submit_task(data);
    props.dispatch({
      type: 'CLEAR_NEW_TASK_FORM'
    });
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_NEW_TASK_FORM'
    });
  }

  let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);

  return <div>
    <h2>New Task</h2>
    <div className="card">
      <div className="card-body">
        <FormGroup>
          <Label for="user_id">user:</Label>
          <Input type="select" name="user_id"
            value={props.new_task_form.user_id} onChange={update}>
            <option></option>
            {users}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="title">title:</Label>
          <Input name="title" value={props.new_task_form.title}
            onChange={update} />
        </FormGroup>
        <FormGroup>
          <Label for="description">description:</Label>
          <Input type="textarea" name="description"
            value={props.new_task_form.description} onChange={update} />
        </FormGroup>
        <Button onClick={submit} color="primary">create task</Button>
        <Button onClick={clear} color="secondary">clear form</Button>
      </div>
    </div>
  </div>;
}

function state2props(state) {
  return {
    new_task_form: state.new_task_form,
    users: state.users,
    token: state.token
  };
}

export default connect(state2props)(TaskNew);
