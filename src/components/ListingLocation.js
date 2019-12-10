import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
const { height, width } = Dimensions.get('window');

export default class ListingLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    const { latitude, longitude } = this.props
    return (
      <View style={styles.container}>
      <MapView
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.012,
            longitudeDelta: 0.012
          }}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude
            }}
            onPress={() => {
              this.props.toggleDirections();
            }}
          />
        </MapView>
      </View>
    );
  }
}

ListingLocationpropTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  toggleDirections: PropTypes.func.isRequired,
};



const styles = StyleSheet.create({
  container:{
    height:height/4,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})
