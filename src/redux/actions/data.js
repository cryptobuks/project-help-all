
import types from './types';
import LISTING_TYPES from '../../dummyDB/LISTING_TYPES.js';
import _ from 'lodash';
const devIp = 'http://192.168.2.216';

const initStaticData = () => ({
  type: types.START_LOADING_DATA
});
const serveData = (data) => ({
  type: types.FINISH_LOADING_DATA,
  data
})
const rejectData = (error) => ({
  type: types.ERROR_LOADING_DATA,
  error
})
const updateListingData = (payload) => ({
  type: types.UPDATE_LISTING_DATA,
  payload
})


export const importData = () => (dispatch, getState) => {
    dispatch(initStaticData())
    fetch(`${devIp}:5000/listings`)
    .then(response => response.json())
    .then((responseJson)=> {
      dispatch(serveData({listings:responseJson.payload}))
    })
    .catch(error=>dispatch(rejectData(error.message))) //to catch the errors if any
};
export const importPatronData = () => (dispatch, getState) => {
    dispatch(initStaticData())
    const token = getState().auth.token;
    const id = getState().auth.id;
    const config = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-auth-token': token,
      }
    }
    fetch(`${devIp}:5000/listings/${id}/patron-get-all`,config)
    .then(response => response.json())
    .then((responseJson)=> {
      console.log(responseJson)
      dispatch(serveData({listings:responseJson.payload,categories:LISTING_TYPES}))
    })
    .catch(error=>console.log(error.message)) //to catch the errors if any
};
export const createListing = (input) => (dispatch, getState) => {
  const _payload = Object.assign({},input,{patron_id: getState().auth.id });
  const _token = getState().auth.token;
     const config = {
       method: 'POST',
       headers: {
        Accept: 'application/json',
       'Content-Type': 'application/json',
       'x-auth-token': _token,
       },
       body: JSON.stringify({ payload: _payload}),
     };

    fetch(`${devIp}:5000/listings/create-listing`,config)
    .then(response => response.json())
    .then((responseJson)=> {
      dispatch(updateListingData(getState().data.listings.concat([responseJson])))
    })
    .catch(error=>dispatch(rejectData(error.message))) //to catch the errors if any
};
export const submitCommitChange = (id) => (dispatch, getState) => {
    //add a commit to listing
    fetch(`${devIp}:5000/listings/${id}/update-commit`)
    .then(response => {
      if (response.status === 400) throw new Error('something went wrong');
      return response.json()
    })
    .then((responseJson)=> {
      const listings = _.clone(getState().data.listings)
      const data = _.map(listings, item => {
        console.log(parseInt(responseJson.payload.commits));
        return (item.id === id) ? Object.assign({},item,{commits:parseInt(responseJson.payload.commits)}):item
      })
      dispatch(updateListingData(data))
    })
    .catch(error=>console.log(error)) //to catch the errors if any
}
export const submitDeliveryChange = (id) => (dispatch, getState) => {
    //add a dellivery to listing
    const token = getState().auth.token
    const config = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-auth-token': token,
      }
    }
    fetch(`${devIp}:5000/listings/${id}/update-delivery`,config)
    .then(response => {
      if (response.status === 400) throw new Error('something went wrong');
      return response.json()
    })
    .then((responseJson)=> {
      const listings = _.clone(getState().data.listings)
      const data = _.map(listings, item => {
        return (item.id === id) ? Object.assign({},item,{deliveries:parseInt(responseJson.payload.deliveries)}):item
      })
      console.log(data)
      dispatch(updateListingData(data))
    })
    .catch(error=>console.log(error)) //to catch the errors if any
}
