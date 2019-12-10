import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback } from 'react-native';
import {
  createStackNavigator,
  StackActions,
  HeaderBackButton,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoggedOut from '../screens/LoggedOut';
import LogIn from '../screens/LogIn';
import SingleListing from '../screens/SingleListing';
import UserListings from '../screens/user/UserListings';
import AdminListings from '../screens/admin/AdminListings';
import ListingCategory from '../screens/admin/ListingCategory';
import ListingItems from '../screens/admin/ListingItems';
import ListingDetails from '../screens/admin/ListingDetails';
import CustomTransitionConfig from '../helpers/CustomTransitionConfig';
const MainView = createStackNavigator(
  {
    LoggedOut: {
      screen: LoggedOut,
      navigationOptions: {
        mode: 'modal',
        header: null,
        gesturesEnabled: false
      }
    },
    LogIn: {
      screen: LogIn,
      navigationOptions({ navigation }) {
        const isEnglish = navigation.getParam('isEnglish');
        const backButton = <TouchableWithoutFeedback onPress={navigation.getParam('logoutUser')}>
                              <View style={{paddingHorizontal:14}}>
                              <Icon name={ isEnglish ?'chevron-left':'chevron-right'} size={18} color={'white'} />
                              </View>
                           </TouchableWithoutFeedback>
          return {
            headerStyle: {
              backgroundColor: 'rgba(32,137,220,0.7)'
            },
            headerTintColor: 'white',
            headerLeft: isEnglish ? backButton:null,
            headerRight:isEnglish ? null :backButton
          };
      }
    },
    AdminListings: {
      screen: AdminListings,
      navigationOptions({ navigation }) {
        const isLoggedIn = navigation.getParam('isLoggedIn');
        const isEnglish = navigation.getParam('isEnglish');
        const logoutButton = <Button
              onPress={navigation.getParam('logoutUser')}
              title={isEnglish ? 'Logout':'خروج'}
              color='white'
            />
        const newListingButton =   <TouchableWithoutFeedback onPress={()=>{navigation.navigate('ListingCategory',{isEnglish:isEnglish})}}>
            <View style={{paddingHorizontal:12}}>
            <Icon name={'plus-square'} size={18} color={'white'} />
            </View>
          </TouchableWithoutFeedback>
        if (isLoggedIn){
          return {
            headerStyle: {
              backgroundColor: 'rgba(32,137,220,0.7)'
            },
            headerLeft:isEnglish ? logoutButton : newListingButton,
            headerRight:isEnglish ? newListingButton : logoutButton,
            headerTintColor: 'white',
          };
        }else{
          return {
            headerStyle: {
              backgroundColor: 'rgba(32,137,220,0.7)'
            },
            headerTintColor: 'white',
            headerLeft:null
          };
        }
      }
    },
    UserListings: {
      screen: UserListings,
      navigationOptions({ navigation }) {
        const isEnglish = navigation.getParam('isEnglish');
        const backButton = <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}>
                              <View style={{paddingHorizontal:14}}>
                              <Icon name={ isEnglish ?'chevron-left':'chevron-right'} size={18} color={'white'} />
                              </View>
                           </TouchableWithoutFeedback>
        return {
          headerStyle: {
            backgroundColor: 'rgba(32,137,220,0.7)'
          },
          headerTintColor: 'white',
          headerRight: isEnglish ? null : backButton,
          headerLeft: isEnglish ?  backButton : null,
        };
      }
    },
    SingleListing: {
      screen: SingleListing,
      navigationOptions({ navigation }) {
        const isEnglish = navigation.getParam('isEnglish');
        const backButton = <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}>
                              <View style={{paddingHorizontal:14}}>
                              <Icon name={ isEnglish ?'chevron-left':'chevron-right'} size={18} color={'white'} />
                              </View>
                           </TouchableWithoutFeedback>
        return {
          headerStyle: {
            backgroundColor: 'rgba(32,137,220,0.7)'
          },
          headerTintColor: 'white',
          headerLeft: isEnglish ? backButton : null,
          headerRight: isEnglish ? null : backButton,
        };
      }
    },
    ListingCategory: {
      screen: ListingCategory,
      navigationOptions({ navigation }) {
        const isEnglish = navigation.getParam('isEnglish');
        const backButton = <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}>
                              <View style={{paddingHorizontal:14}}>
                              <Icon name={ isEnglish ?'chevron-left':'chevron-right'} size={18} color={'white'} />
                              </View>
                           </TouchableWithoutFeedback>
        return {
          headerStyle: {
            backgroundColor: 'rgba(32,137,220,0.7)'
          },
          headerTintColor: 'white',
          headerLeft: isEnglish ? backButton:null,
          headerRight:isEnglish ? null :backButton
        };
      }
    },
    ListingItems: {
      screen: ListingItems,
      navigationOptions({ navigation }) {
        const isEnglish = navigation.getParam('isEnglish');
        const backButton = <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}>
                              <View style={{paddingHorizontal:14}}>
                              <Icon name={ isEnglish ?'chevron-left':'chevron-right'} size={18} color={'white'} />
                              </View>
                           </TouchableWithoutFeedback>
        return {
          headerStyle: {
            backgroundColor: 'rgba(32,137,220,0.7)'
          },
          headerTintColor: 'white',
          headerLeft: isEnglish ? backButton : null,
          headerRight: isEnglish ? null :backButton
        };
      }
    },
    ListingDetails: {
      screen: ListingDetails,
      navigationOptions({ navigation }) {
        const isEnglish = navigation.getParam('isEnglish');
        const backButton = <TouchableWithoutFeedback onPress={()=>{navigation.goBack()}}>
                              <View style={{paddingHorizontal:14}}>
                              <Icon name={ isEnglish ?'chevron-left':'chevron-right'} size={18} color={'white'} />
                              </View>
                           </TouchableWithoutFeedback>
        return {
          headerStyle: {
            backgroundColor: 'rgba(32,137,220,0.7)'
          },
          headerTintColor: 'white',
          headerLeft: isEnglish ? backButton:null,
          headerRight:isEnglish ? null :backButton
        };
      }
    },
  },
  {transitionConfig: CustomTransitionConfig}
);

export default createAppContainer(
  createSwitchNavigator(
    {
      MainView: MainView,
    },
    {
      initialRouteName: 'MainView',
    }
  )
);
