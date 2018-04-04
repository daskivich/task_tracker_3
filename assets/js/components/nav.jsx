import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

// pattern match, pulling login from the state via {login}
let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    ev.preventDefault(); // when submitting a form
    api.submit_login(props.login);
    console.log(props.login);
  }

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="email" placeholder="email"
               value={props.login.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" placeholder="password"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
    </Form>
  </div>;
});

// pattern match out the token from the state via {token}
let Session = connect(({token}) => {return {token};})((props) => {
  return <div className="navbar-text">
    hello, {props.token.user_name}!
    <Logout />
  </div>;
});

let Logout = connect(({token}) => {return {token};})((props) => {
  function submit_logout(ev) {
    props.dispatch({
      type: 'LOG_OUT'
    });
  }

  return <Link to="/" onClick={submit_logout}>Log Out</Link>;
});

function Nav(props) {
  let to_my_tasks;
  let nav_links;
  let session_info;

  if (props.token) {
    to_my_tasks = "/users/" + props.token.user_id;

    nav_links =
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Tasks</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={to_my_tasks} href="#" activeClassName="active" className="nav-link">MyTasks</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users" href="#" activeClassName="active" className="nav-link">Users</NavLink>
        </NavItem>
      </ul>;
    session_info = <Session token={props.token} />;
  }
  else {
    nav_links = <span></span>;
    session_info = <LoginForm />;
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand row">
      <span className="col">
        <span className="row">
          <span className="navbar-brand col">TaskTracker</span>
          {nav_links}
        </span>
      </span>
      <span className="navbar-text text-right col">{session_info}</span>
    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token
  };
}

export default connect(state2props)(Nav);
