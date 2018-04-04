import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../api';

function UserEdit(props) {
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
    data[attr] = val;

    let action = {
      type: 'UPDATE_EDIT_USER_FORM',
      data: data
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    let data = {
      token: props.token.token,
      user_params: {
        id: props.edit_user_form.id,
        name: props.edit_user_form.name,
        email: props.edit_user_form.email,
        password: props.edit_user_form.password,
        password_confirmation: props.edit_user_form.password_confirmation
      }
    };

    api.update_user(data);
    console.log(data);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_EDIT_USER_FORM'
    });
  }

  // TODO: fix cancel_path
  let cancel_path = "/";

  return <div style={{padding: "4ex"}}>
    <h2>Edit Account</h2>
    <FormGroup>
      <Label for="name">Name</Label>
      <Input name="name" value={props.edit_user_form.name} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="email">Email</Label>
      <Input type="email" name="email" value={props.edit_user_form.email} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="password">Password</Label>
      <Input type="password" name="password" value={props.edit_user_form.password} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="password_confirmation">Confirm Password</Label>
      <Input type="password" name="password_confirmation" value={props.edit_user_form.password_confirmation} onChange={update} />
    </FormGroup>
    <Button onClick={submit} color="primary">Submit Changes</Button>
    <Link to={cancel_path} onClick={clear} color="secondary">Cancel</Link>
  </div>;
}

function state2props(state) {
  console.log("rerender@UserEdit", state);
  return {
    edit_user_form: state.edit_user_form,
    token: state.token
  };
}

export default connect(state2props)(UserEdit);
