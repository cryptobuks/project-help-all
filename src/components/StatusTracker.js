import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
export default class StatusTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { commits, deliveries, isEnglish} = this.props;
    const _grey = 'rgba(238, 234, 234, 1)';
    const _lightBlue = 'rgba(53,137,220,.55)';
    const _darkBlue = 'rgba(53,137,220,.95)';
    let _leftBlock = isEnglish ? `(${commits}) commits` : ` تم التوصيل (${deliveries})` ;
    let _rightBlock = isEnglish ? `(${deliveries}) deliveries` :` وعد (${commits})` ;
    let _leftBlockColor = isEnglish ? (commits ? _lightBlue : _grey) : (deliveries ? _darkBlue : _grey);
    let _rightBlockColor = isEnglish ? (deliveries ? _darkBlue : _grey) : (commits ? _lightBlue : _grey);
    return (
      <View style={{height:40, paddingVertical:0,}}>
        <View style={{flex: 1, flexDirection: 'row',justifyContent:'space-between',paddingTop:10}}>
          <View style={{flexDirection:'column'}}>
            <View style={[styles.bar,
              { borderTopLeftRadius:6,
                borderBottomLeftRadius:6,
                backgroundColor: _leftBlockColor }]} />
            <Text style={{alignSelf:isEnglish?'flex-start':'flex-end',color:'grey',fontSize:12,paddingLeft:4}}>{_leftBlock}</Text>
          </View>
          <View style={{flexDirection:'column'}}>
            <View style={[styles.bar,
              { borderTopRightRadius:6,
                borderBottomRightRadius:6,
                backgroundColor: _rightBlockColor}]} />
            <Text style={{alignSelf:isEnglish?'flex-start':'flex-end',color:'grey',fontSize:12,paddingLeft:4}}>{_rightBlock}</Text>
          </View>
        </View>
      </View>
    );
  }
}

StatusTracker.propTypes = {
  commits: PropTypes.number.isRequired,
  deliveries: PropTypes.number.isRequired,
  isEnglish: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flex: 1,
    marginHorizontal:20,
  },
  bar:{
    height:8,
    width:width/3,
    borderWidth:1,
    borderColor: 'white'
  }
});
