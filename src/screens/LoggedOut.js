import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';
import { changeLanguage } from  '../redux/actions/auth';
import { connect } from 'react-redux';
import handleLocPerm from '../helpers/LocationPermission';

class LoggedOut extends Component {
  constructor(props) {
    super(props);
    this.state ={
      isEnglish: true
    };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {isEnglish: nextProps.auth.languageEN}
  }

    componentDidMount(){
      handleLocPerm().then( data => {
       const payload =
           data.longitude ? {
           longitude:data.longitude,
           latitude:data.latitude,
           status:200 }
           :
           { status:404 }
       this.setState(payload);
     })
    }


  render() {
    const { isEnglish } = this.state;
    const _params = Object.assign({},{
      transition: isEnglish ? null : 'slideFromLeft',
      isEnglish: isEnglish
      },
      this.state)
      console.log(this.state);
    return (
      <View style={styles.container}>
      <View style={{width:200}}>
      <Button
        title={isEnglish ? 'Donate' : 'ساهم'}
        raised
        onPress={()=>this.props.navigation.navigate('UserListings',_params)}
      />
      </View>
      <View style={{paddingVertical:10}}/>
      <View style={{width:200}}>
      <Button
        title={isEnglish ? 'Request' : 'اطلب'}
        raised
        onPress={()=>this.props.navigation.navigate('LogIn',_params)}
      />
      </View>
      <View style={[styles.langWrapper]}>
        <TouchableOpacity onPress={()=>{this.props.changeLanguage()}}>
          <View>
            <Text style={[styles.langButton,{textDecorationLine: isEnglish ? null : 'underline'}]}>
              {isEnglish ? 'عربي' :'English'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = {
  changeLanguage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedOut);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  langWrapper: {
    paddingTop:60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  langButton: {
    color: 'rgba(32,137,220,0.7)',
    fontSize: 16,

  },
  })
