import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';

import {
  importData,
} from '../../redux/actions/data';
import { connect } from 'react-redux';
import _ from 'lodash';

import Listings from '../../components/Listings';

class UserListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnglish: this.props.auth.languageEN
    };
    this.props.importData();
  };


  render() {
    const { listings } = this.props.data;
    const { isEnglish } = this.state;
    const { latitude, longitude, status } = this.props.navigation.state.params;
    return (
      <View style={{flex:1}}>
        {!_.isEmpty(listings) && <Listings data={listings} currentPosition={{enabled:status===200,latitude:latitude,longitude:longitude}} isEnglish={isEnglish} navigation={this.props.navigation} />}
      </View>
    );
  };
}

const mapStateToProps = state => ({
  data: state.data,
  auth: state.auth
});
const mapDispatchToProps = {
  importData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListings);

const styles = StyleSheet.create({

})
