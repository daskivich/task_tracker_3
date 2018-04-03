import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function User(props) {
  return <p>{props.user.name} - <Link to={"/users/" + props.user.id}>tasks</Link></p>;
}

function Users(props) {
  let users = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);

  if (props.token == null) {
    return <div>Please log in.</div>
  } else {
    return <div>{users}</div>
  }
}

function state2props(state) {
  return {
    users: state.users,
    token: state.token
  };
}

export default connect(state2props)(Users);
