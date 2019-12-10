/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { Provider } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import { PersistGate } from "redux-persist/lib/integration/react";
import Navigator from "./src/navigator/Routes.js";
import configureStore from "./src/redux/store";
const { store, persistor } = configureStore();
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

persistor.purge()
AsyncStorage.clear()

const App = () => {
  return (
    <Fragment>
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="small" color="#00ff00" />}
        persistor={persistor}
      >
        <Navigator/>
      </PersistGate>
    </Provider>
    </Fragment>
  );
};


export default App;
