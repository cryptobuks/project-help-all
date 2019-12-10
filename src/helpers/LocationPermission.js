import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
const posSetter = (position) => {
  return {latitude: position.coords.latitude, longitutde: position.coords.longitude}
};
const errorHandler = (error) => {
  return { error: error.message}
}

const handleLocPerm = () => {
  return new Promise(function(resolve, reject) {
    check(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            resolve('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
              .then(response => {
                if (response === RESULTS.GRANTED){
                  Geolocation.getCurrentPosition(
                    position => resolve(position.coords),
                    error => reject(error),
                    { enableHighAccuracy: true, timeout: 200000, maximumAge: 500 }
                  );
                }
              })
            break;
          case RESULTS.GRANTED:
            Geolocation.getCurrentPosition(
              position => resolve(position.coords),
              error => reject(error),
              { enableHighAccuracy: true, timeout: 200000, maximumAge: 500 }
            );
            break;
          case RESULTS.BLOCKED:
            resolve('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
export default handleLocPerm;
