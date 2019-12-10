import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';
import ListSkeleton from '../../components/ListSkeleton';

export default class ListingItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items:this.props.navigation.state.params.category.items,
      selection:[],
    };
    this.actionHandler = this.actionHandler.bind(this);
  };
  actionHandler = (input) => {
    const { isEnglish, title_en, title_ar, icon } = this.props.navigation.state.params.category;
    this.setState({
      selection:input.payload,
      isEnglish:isEnglish
    })
    let params = Object.assign(this.props.navigation.state.params,{
      items:input.payload,
      title_en:title_en,
      title_ar:title_ar,
      icon:icon
    })
    this.props.navigation.navigate('ListingDetails',params);
  }

  render() {
    return (
      <View style={styles.container}>
      <ListSkeleton
       isEnglish={this.props.navigation.state.params.isEnglish}
       data={this.state.items}
       headerTitleEN={'Select Item(s)'}
       headerTitleAR={' اختار الاحتياجاة'}
       buttonTitle={this.props.navigation.state.params.isEnglish ? 'Next':'حفظ'}
       singleSelection={false}
       handleButtonPress={(payload) => {this.actionHandler(payload)}}
       />
      </View>
    );
  }
}



const styles = StyleSheet.create({
    container:{
      flex: 1,
      flexDirection:'column',
      justifyContent:'flex-start'
    }
})
