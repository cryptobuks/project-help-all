import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';
import {
  importPatronData,
} from '../../redux/actions/data';
import {
  logoutPatron,
} from '../../redux/actions/auth';
import Listings from '../../components/Listings';
import { connect } from 'react-redux';
import _ from 'lodash';


class AdminListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings:[],
      isEnglish: this.props.auth.languageEN
    };
    this.props.importPatronData();
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.auth.isLoggedIn){
      nextProps.navigation.navigate('LoggedOut',{transition: nextProps.auth.languageEN ? null : 'slideFromLeft'});
    }
    return {listings:nextProps.data.listings,isEnglish:nextProps.auth.languageEN};
  }
  _logoutUser = () => {
    this.props.logoutPatron();
  }
  componentDidMount() {
    this.props.navigation.setParams({
      logoutUser: this._logoutUser,
      isLoggedIn:true,
      isEnglish:this.props.auth.languageEN});
  }

  render() {
    const { isEnglish, listings } = this.state;
    return (
      <View style={{flex:1}}>
        {!_.isEmpty(listings) && <Listings data={listings} currentPosition={{status:400}} isEnglish={isEnglish} navigation={this.props.navigation} />}
        { _.isEmpty(listings) &&
            <View style={styles.container}>
              <Text style={styles.description}>
                No Posts yet
              </Text>
            </View>
        }
      </View>

      );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  data: state.data
});
const mapDispatchToProps = {
  importPatronData,
  logoutPatron
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminListings);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:200,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: 'grey',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
