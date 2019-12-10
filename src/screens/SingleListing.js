import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
  Linking
} from 'react-native';
import { ListItem , Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import ListingLocation from '../components/ListingLocation.js';
import { Popup } from 'react-native-map-link';
import {
  submitCommitChange,
  submitDeliveryChange
} from  '../redux/actions/data';
import { connect } from 'react-redux';
import _ from 'lodash';


class SingleListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible:false,
      payload:this.props.navigation.state.params.payload,
      items:this.props.navigation.state.params.items,
      isEnglish: this.props.navigation.state.params.isEnglish
    };
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleAdminPress = this.handleAdminPress.bind(this);
    this.handleUserPress = this.handleUserPress.bind(this);

  };
  handleButtonPress(){
    this.props.auth.isAdmin ? this.handleAdminPress() : this.handleUserPress();
  }
  handleUserPress(){
     const _text = this.state.isEnglish ? 'Inform post owner that you will contribute' : 'أبلغ صاحب الطلب أنك سوف تساعد'
     const _title = this.state.isEnglish ? 'Please read' : 'انتباه'
     Alert.alert(
       _title,
       _text
       ,
       [{ text: 'Ok', onPress: () => confirm(), style: 'cancel' }],
       { cancelable: false }
     );
     const confirm = () =>{
       this.setState({isVisible:true});
       this.props.submitCommitChange(this.state.payload.id)
     }
  }
  handleAdminPress(){
    this.props.submitDeliveryChange(this.state.payload.id);
    Alert.alert(
      'Thanks',
      'Delivery status updated'
      ,
      [{ text: 'Ok', onPress: () => confirm(), style: 'cancel' }],
      { cancelable: false }
    );
    const confirm = () =>{
      this.props.navigation.goBack();
    }

  }
  render() {
    const { payload, isEnglish, items } = this.state;
    console.log(payload);
    const buttonTitle = this.props.auth.isAdmin ? (isEnglish ? 'Record Delivery': 'سجل تسليم'):(isEnglish ? 'Donate': 'ساهم')
    return (
      <View style={styles.container}>
        <Text style={[styles.label,isEnglish ? null: {alignSelf:'flex-end'}]}>{isEnglish ? 'Items needed' : 'السلع المطلوبة'}</Text>
        {items.map((l, i) => (
        <ListItem
          containerStyle={{
            backgroundColor:'white',
            shadowColor: 'rgba(32,137,220,0.7)',
            shadowOffset: { width: 0.1, height: -0.1 },
            shadowOpacity: 0.1,
            borderRadius: 4,
            height: 50,
            marginRight: 5
          }}
          key={i}
          title={isEnglish ? l.title_en : null}
          rightTitle={isEnglish ? null : l.title_ar}
          rightTitleStyle={{ alignSelf:'flex-end' }}
          rightContentContainerStyle={{flex:1}}
          titleStyle={{color:'grey'}}
        />))}
          {(payload.phone !=='') &&
          <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
              <Button
                  icon={
                    <Icon
                      name={'phone'}
                      size={18}
                      color='rgba(32,137,220,0.7)'
                      style={{ justifyContent: 'center' }}
                    />
                  }
                  title={isEnglish? ` Contact `:` اتصل `}
                  type={'outline'}
                  raised
                  onPress={() => { Linking.openURL(`tel://${payload.phone}`).catch(err => console.log('Error:', err))}}/>
            </View>
            </View>
          }
          <Text style={[styles.label,isEnglish?null:{alignSelf:'flex-end'}]}>{isEnglish ? 'Drop off location' : ' موقع التسليم'}</Text>
          <ListingLocation latitude={parseFloat(payload.latitude)} longitude={parseFloat(payload.longitude)} toggleDirections={()=>null} />
          <Popup
            isVisible={this.state.isVisible}
            onCancelPressed={() => this.setState({ isVisible: false })}
            onAppPressed={() => this.setState({ isVisible: false })}
            onBackButtonPressed={() => this.setState({ isVisible: false })}
            options={{
              latitude: payload.latitude,
              longitude: payload.longitude,
              dialogTitle: 'Get Directions',
              dialogMessage: 'Choose your preferred application',
              cancelText: 'Cancel'
            }}
          />
          <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
          <Button
            title={buttonTitle}
            onPress={this.handleButtonPress}
            raised
          />
          </View>
          </View>
      </View>

    );
  }
}


const mapStateToProps = state => ({
  data: state.data,
  auth: state.auth,
});
const mapDispatchToProps = {
  submitCommitChange,
  submitDeliveryChange
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleListing);


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  mapWrapper:{
    height:'100%'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  buttonWrapper:{
    width:200,
  },
  buttonContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label:{
    paddingHorizontal:12,
    fontSize: 20,
    color: 'grey',
    fontWeight: '600',
    paddingVertical: 18
  }
})
