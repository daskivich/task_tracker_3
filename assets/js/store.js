import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
*  state layout:
*  {
*   tasks: [... Tasks ...],
*   users: [... Users ...],
*   new_task_form: {
*     user_id: integer,
*     title: string,
*     description: string,
*     token: string
*   },
*   edit_task_form: {
*     id: integer,
*     user_id: integer,
*     title: string,
*     description: string,
*     time_invested: integer,
*     completed: boolean
*   },
*   token: {
*     token: string,
*     user_id: integer,
*     user_name: string
*   },
*   login: {
*     email: string,
*     password: string
*   }
* }
*
* */

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASKS_LIST':
      return [...action.tasks];
    case 'ADD_TASK':
      return [action.task, ...state];
    case 'LOG_OUT':
      return [];
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case 'USERS_LIST':
      return [...action.users];
      case 'ADD_USER':
        return [action.user, ...state];
    case 'LOG_OUT':
      return [];
    default:
      return state;
  }
}

let empty_new_user_form = {
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
};

function new_user_form(state = empty_new_user_form, action) {
  switch (action.type) {
    case 'UPDATE_NEW_USER_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_NEW_USER_FORM':
      return empty_new_user_form;
    case 'LOG_OUT':
      return empty_new_user_form;
    default:
      return state;
  }
}

let empty_new_task_form = {
  user_id: "",
  title: "",
  description: "",
};

function new_task_form(state = empty_new_task_form, action) {
  switch (action.type) {
    case 'UPDATE_NEW_TASK_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_NEW_TASK_FORM':
      return empty_new_task_form;
    case 'LOG_OUT':
      return empty_new_task_form;
    default:
      return state;
  }
}

let empty_edit_user_form = {
  id: "",
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
};

function edit_user_form(state = empty_edit_user_form, action) {
  switch (action.type) {
    case 'SELECT_USER_FOR_EDITING':
      return Object.assign({}, state, action.data);
    case 'UPDATE_EDIT_USER_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_EDIT_USER_FORM':
      return empty_edit_user_form;
    case 'LOG_OUT':
      return empty_edit_user_form;
    default:
      return state;
  }
}

let empty_edit_task_form = {
  id: "",
  user_id: "",
  title: "",
  description: "",
  time_invested: 0,
  completed: false
};

function edit_task_form(state = empty_edit_task_form, action) {
  switch (action.type) {
    case 'SELECT_TASK_FOR_EDITING':
      return Object.assign({}, state, action.data);
    case 'UPDATE_EDIT_TASK_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_EDIT_TASK_FORM':
      return empty_edit_task_form;
    case 'LOG_OUT':
      return empty_edit_task_form;
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'LOG_OUT':
      return null;
    default:
      return state;
  }
}

let empty_login = {
  email: "",
  password: ""
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    case 'LOG_OUT':
      return empty_login;
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {tasks, users, form} is ES6 shorthand for
  // {tasks: tasks, users: users, form: form}
  let reducer = combineReducers({tasks, users, new_task_form, edit_task_form, new_user_form, edit_user_form, token, login});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
