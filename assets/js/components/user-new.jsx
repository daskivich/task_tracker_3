import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

function UserNew(props) {
  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_NEW_USER_FORM',
      data: data
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    api.submit_user(props.new_user_form);
    props.dispatch({
      type: 'CLEAR_NEW_USER_FORM'
    });
    console.log(props.new_user_form);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_NEW_USER_FORM'
    });
  }

  return <div style={{padding: "4ex"}}>
    <h2>Create an Account</h2>
    <FormGroup>
      <Label for="name">Name</Label>
      <Input name="name" value={props.new_user_form.name} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="email">Email</Label>
      <Input type="email" name="email" value={props.new_user_form.email} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="password">Password</Label>
      <Input type="password" name="password" value={props.new_user_form.password} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="password_confirmation">Confirm Password</Label>
      <Input type="password" name="password_confirmation" value={props.new_user_form.password_confirmation} onChange={update} />
    </FormGroup>
    <Button onClick={submit} color="primary">Create Account</Button>
    <Button onClick={clear} color="secondary">Cancel</Button>
  </div>;
}

function state2props(state) {
  console.log("rerender@UserNew", state);
  return {
    new_user_form: state.new_user_form
  };
}

export default connect(state2props)(UserNew);
