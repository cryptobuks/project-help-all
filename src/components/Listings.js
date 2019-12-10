import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import  StatusTracker  from '../components/StatusTracker';
import Icon from 'react-native-vector-icons/FontAwesome';
import renderSubtitle from '../helpers/renderSubtitle';
import { getDistance } from 'geolib';
import _ from 'lodash';
import DATA from '../dummyDB/DATA.js';


export default class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnglish:this.props.isEnglish
    };
  this.renderItem = this.renderItem.bind(this);
  this.openListing = this.openListing.bind(this);
  };
  openListing(item) {
      this.props.navigation.navigate('SingleListing',{ payload:item,items:renderSubtitle({listing:item,isEnglish:this.state.isEnglish}).data,isEnglish:this.state.isEnglish });
  }

  renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={()=>{this.openListing(item)}} key={item.id}>
      <ListItem
        key={item.id.toString()}
        title={this.state.isEnglish ? item.title_en:item.title_ar}
        titleStyle={[styles.title,!this.state.isEnglish ? {alignSelf:'flex-end'}:{}]}
        subtitle={<View style={styles.subtitleView}>
                    <Text style={[styles.subText,{alignSelf:this.state.isEnglish?'flex-start':'flex-end'}]}>{renderSubtitle({listing:item,isEnglish:this.state.isEnglish}).text}</Text>
                    <View styles={styles.subSectionWrapper}>
                    <View style={[styles.subSection,!this.state.isEnglish ? {alignSelf:'flex-end'}:{}]}>
                    <StatusTracker commits={parseInt(item.commits)} deliveries={parseInt(item.deliveries)} isEnglish={this.state.isEnglish} />
                    </View>
                    {this.props.currentPosition.enabled &&
                      <View style={{flex:1,flexDirection:'row',paddingLeft:3,paddingTop:6,alignSelf:this.state.isEnglish? 'flex-end': 'flex-start'}}>
                      <Icon name={'map-marker'} size={12} color={'rgba(53,137,220,.95)'}/>
                      <Text style={{
                        color:'grey',
                        fontSize:12

                        }}>
                        {' ' + getDistance({latitude:this.props.currentPosition.latitude,
                                    longitude:this.props.currentPosition.longitude},
                                    {latitude: item.latitude,
                                    longitude: item.longitude})+' meters away'}</Text>
                        </View>
                            }
                    </View>
                  </View>}
        leftAvatar={this.state.isEnglish ? <Icon name={item.icon} size={24} color={'rgba(53,137,220,.95)'}/> : null}
        rightAvatar={!this.state.isEnglish ? <Icon name={item.icon} size={24} color={'rgba(53,137,220,.95)'}/> : null}
        bottomDivider
        chevron={this.state.isEnglish}
      />
    </TouchableOpacity>
  );
  render() {
    const { data } = this.state;
    return (
    <SafeAreaView style={styles.container}>
     <FlatList
       data={this.props.data}
       renderItem={this.renderItem}
       keyExtractor={item => item.id.toString()}
     />
   </SafeAreaView>
    );
  }
}

Listings.propTypes = {
  data: PropTypes.array.isRequired,
  isEnglish: PropTypes.bool.isRequired,
  currentPosition:PropTypes.object.isRequired,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    marginHorizontal:8,
    fontSize: 18,
    color:'grey',
    fontWeight: 'bold'
  },
  subtitleView: {
    marginHorizontal:8,
    flexDirection: 'column',
    paddingTop: 5,
  },
  subSectionWrapper:{
    flex:1,
    flexDirection:'column',
  },
  subSection:{
    flex:1,
    flexDirection:'row',
  },
  subText: {
    color: 'grey'
  }
})
