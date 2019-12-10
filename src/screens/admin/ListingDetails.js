import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import {
  TextField,
} from 'react-native-material-textfield';
import { createListing } from '../../redux/actions/data';
import { connect } from 'react-redux';
import handleLocPerm from '../../helpers/LocationPermission';
import MapView, { Marker } from 'react-native-maps';

  class ListingDetails extends Component {
    constructor(props) {
      super(props);
      this.state = {
        languageEN: this.props.navigation.getParam('isEnglish'),
        longitude:null,
        latitude:null,
        markerLatitude:null,
        markerLongitude:null,
        errors: {},
        phone:'',
        name:'',
        status:null
      };
    this.submitListing = this.submitListing.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
    this.nameRef = this.updateRef.bind(this, 'name');
    this.phoneRef = this.updateRef.bind(this, 'phone');
  };
  onFocus() {
  let { errors = {} } = this.state;
  for (let name in errors) {
    let ref = this[name];
    if (ref && ref.isFocused()) {
      delete errors[name];
    }
  }
    this.setState({ errors });
  }
  onChangeText(text) {
   ['name', 'phone']
     .map((name) => ({ name, ref: this[name] }))
     .forEach(({ name, ref }) => {
       if (ref.isFocused()) {
         this.setState({ [name]: text });
       }
     });
 }
  onSubmitName() {
    this.phone.focus()
  }

   updateRef(name, ref) {
      this[name] = ref;
    }

  submitListing = () => {
    let errors = {};
    ['name', 'phone']
      .forEach((name) => {
        let value = this[name].value();
        const validatePhone = (phone) => {
          if (!phone || phone ===''){
            return true;
          }
          let re =  /^[+-]?\d+$/;
          return re.test(String(phone));
        }
        if ('phone' === name && !validatePhone(value)) {
          errors[name] = 'Invalid Phone Number';
        }
      });
      console.log(Object.keys(errors));
    if (Object.keys(errors).length === 0) {
        this.props.createListing(Object.assign({},this.state,this.props.navigation.state.params))
        setTimeout(()=>{this.props.navigation.pop(3) }, 500);

    }
    this.setState({ errors });

  }
  componentDidMount(){
     handleLocPerm().then( data => {
      const payload =
          data.longitude ? {
          longitude:data.longitude,
          latitude:data.latitude,
          latitudeDelta: 0.00621,
          longitudeDelta: 0.00521,
          markerLatitude:data.latitude,
          markerLongitude:data.longitude,
          status:200 }
          :
          { status:404 }
      this.setState(payload);
    })
  }


  render() {
    const {
      longitude,
      latitude,
      status,
      markerLatitude,
      markerLongitude,
      latitudeDelta,
      longitudeDelta,
      languageEN,
      errors
    } = this.state;
    return (
      <View style={styles.container}>
      <Text style={[styles.header,languageEN ? null : {alignSelf:'flex-end'}]}>{languageEN?'Post Details' : 'تفاصيل الطلب'}</Text>
      <View style={{paddingVertical:8}}>
      <TextField
          ref={this.nameRef}
          secureTextEntry={false}
          autoCapitalize='none'
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          clearTextOnFocus={false}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitName}
          returnKeyType='done'
          label={languageEN ? 'Contact Person (optional)':'الاسم'}
          error={errors.name}
          maxLength={30}
       />
      </View>
      <View style={{paddingVertical:8}}>
      <TextField
          ref={this.phoneRef}
          secureTextEntry={false}
          keyboardType='phone-pad'
          autoCapitalize='none'
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          clearTextOnFocus={false}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          returnKeyType='done'
          label={languageEN ? 'Phone Number (optional)':'رقم الهاتف'}
          error={errors.phone}
          maxLength={30}
       />
      </View>
      {status===200 &&
        <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta
          }}
          onRegionChangeComplete={region => {
            this.setState({
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            });
          }}
        >
        <Marker
          draggable
          coordinate={{
            latitude: markerLatitude,
            longitude: markerLongitude
          }}
          onDragEnd={e => {
            this.setState({
              markerLatitude: e.nativeEvent.coordinate.latitude,
              markerLongitude: e.nativeEvent.coordinate.longitude,
              latitude:e.nativeEvent.coordinate.latitude,
              longitude:e.nativeEvent.coordinate.longitude
            });
          }}
          title={languageEN?'Drop-off location':'حدد موقع التسليم'}
        />
        </MapView>
        </View>
        }
        <View style={styles.buttonWrapper}>
        <Button
          title={languageEN ? 'Submit' : 'حفظ'}
          raised
          onPress={this.submitListing}
        />
        </View>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  data: state.data,
});
const mapDispatchToProps = {
  createListing
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingDetails);

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:20,
  },
  mapContainer:{
    paddingTop:50,
    height:300,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    fontSize: 24,
    color: 'grey',
    fontWeight: '600',
    paddingTop: 20,
  },
  buttonWrapper:{
      paddingVertical:30,
      justifyContent: 'center',
      alignItems: 'center',
  },
})
