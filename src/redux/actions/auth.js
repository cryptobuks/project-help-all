
import types from './types';
import _ from 'lodash';
import { Buffer } from 'buffer';
import AUTH from '../../dummyDB/AUTH.js'
const devIp = 'http://192.168.2.216';
const setPreferredLanguage = (lang) =>({
  type: types.CHANGE_LANGUAGE,
  lang,
})
const startVerification = () => ({
  type: types.START_PATRON_VERIFICATION
});
const finishVerification = (payload) => ({
  type: types.FINISH_PATRON_VERIFICATION,
  payload
});
const rejectVerification = (msg) => ({
  type: types.REJECT_PATRON_VERIFICATION,
  msg
});
const finishCredModification = (payload) => ({
  type: types.FINISH_CRED_MODIFICATION,
  payload
});
const processLogin = (payload) => ({
  type: types.LOGIN_PATRON,
  payload
});
const processLogout = () => ({
  type: types.LOGOUT_PATRON
});


export const loginPatron = (input) => (dispatch, getState) => {
  const {username, password} = input;
  let encodedCredentials = new Buffer(username+':'+password).toString('base64');
  const config = {
    method: 'GET',
    headers: {
      'authenticate': JSON.stringify(encodedCredentials),
      'content-Type': 'application/json',
    }
  }
  fetch(`${devIp}:5000/auth/login`,config)
  .then(response => {
   if (response.status === 400) throw new Error('Username not found')
   if (response.status === 401) throw new Error('Password is not valid')
   return response.json()
  })
  .then(responseJson =>{
    dispatch(processLogin(responseJson));
  })
  .catch(error => dispatch(rejectVerification(error.message)))
};

export const activatePatron = (input) => (dispatch, getState) => {
  dispatch(startVerification());
  const {code, identifier} = input;
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: code, identifier: identifier }),
  }
  // Request body
  fetch(`${devIp}:5000/auth/activate`,config)
  .then(response => {
   if (response.status === 400) throw new Error('Credentials not valid')
   return response.json()
  })
  .then(responseJson =>{
    const { token, patron} = responseJson;
    dispatch(finishVerification({token:token,patron:patron}));
  })
  .catch(error => dispatch(rejectVerification(error.message)))
};

export const setNewCredentials = (input) => (dispatch, getState) => {
  const {username, password, identifier} = input;
  const token = getState().auth.token;
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-auth-token': token,
    },
    body: JSON.stringify({ username: username, password: password, identifier:identifier}),
  }
  // Request body
  fetch(`${devIp}:5000/auth/modify`,config)
  .then(async response => {
   if (response.status === 400){
     const _response = await response.json();
     throw new Error(_response.error.constraint === 'unique_username' ? 'Username already taken' : 'Something went wrong')
   } else {
     return response.json()
   }
  })
  .then(responseJson =>{
    dispatch(finishCredModification(responseJson));
  })
  .catch(error => dispatch(rejectVerification(error.message)))
};

export const logoutPatron = (input) => (dispatch, getState) => {
  dispatch(processLogout());
};

export const changeLanguage = () => (dispatch, getState) => {
  dispatch(setPreferredLanguage(!getState().auth.languageEN));
};
