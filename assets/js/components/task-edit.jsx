import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../api';

// a form to edit a task
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

    // completed value must be converted from string to boolean
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

  // initialize radio button selection to current status
  if (props.edit_task_form.completed) {
    complete = true;
    incomplete = false;
  } else {
    complete = false;
    incomplete = true;
  }

  return <div>
    <h2>Edit Task</h2>
    <div className="card">
    <div className="card-body">
        <FormGroup>
          <Label for="id">task ID:</Label>
          <Input plaintext>{props.edit_task_form.id}</Input>
        </FormGroup>
        <FormGroup>
          <Label for="user_id">user:</Label>
          <Input plaintext>{props.edit_task_form.user_id}</Input>
        </FormGroup>
        <FormGroup>
          <Label for="title">title:</Label>
          <Input plaintext>{props.edit_task_form.title}</Input>
        </FormGroup>
        <FormGroup>
          <Label for="title">description:</Label>
          <Input plaintext>{props.edit_task_form.description}</Input>
        </FormGroup>
        <FormGroup>
          <Label for="time_invested">minutes invested:</Label>
          <Input type="select" name="time_invested"
            value={props.edit_task_form.time_invested} onChange={update}>
            {options}
          </Input>
        </FormGroup>
        <FormGroup tag="fieldset">
          Status
          <FormGroup check>
            <Label check>
              <Input type="radio" name="completed" value="true"
                checked={complete} onChange={update} />{' '}
              complete
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="completed" value="false"
                checked={incomplete} onChange={update} />{' '}
              incomplete
            </Label>
          </FormGroup>
        </FormGroup>
        <Link to={path} onClick={submit} className="bp">submit changes</Link>
        <Link to={path} onClick={clear} className="bs">cancel</Link>
      </div>
    </div>
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
