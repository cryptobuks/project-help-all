import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, StyleSheet,Dimensions} from 'react-native';
import { ListItem } from 'react-native-elements';
const { height, width } = Dimensions.get('window');
import _ from 'lodash';
export default class ListItemSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection:this.props.selection,
      item: this.props.item
    };
  }

  static getDerivedStateFromProps(nextProps,prevState) {
   return Object.assign({},prevState,{item:nextProps.item,selection:nextProps.selection})
   }
  render() {
    const { isEnglish, itemKey} = this.props;
    const { selection, item } = this.state;
    const checkMark = {
      color:
      _.includes(selection,item)
          ? 'white'
          : 'grey',
      name: 'check-circle',
      type: 'FontAwesome'
    };
    return (
      <ListItem
        containerStyle={{
          backgroundColor:
            _.includes(selection,item)
              ? 'rgba(32,137,220,0.7)'
              : 'white',
          shadowColor: 'rgba(32,137,220,0.7)',
          shadowOffset: { width: 0.1, height: -0.1 },
          shadowOpacity: 0.1,
          borderRadius: 4,
          height: 50,
          marginRight: 5
        }}
        key={itemKey}
        title={isEnglish ? item.title_en : null}
        rightTitle={isEnglish ? null : item.title_ar}
        rightTitleStyle={{ width:100 }}
        rightContentContainerStyle={{flex:1,alignContent:'flex-end'}}
        rightTitleStyle={{
          color:
            _.includes(selection,item)
              ? 'white'
              : 'grey'
        }}
        titleStyle={{
          color:
            _.includes(selection,item)
              ? 'white'
              : 'grey'
        }}
        rightIcon={isEnglish ? checkMark : {}}
        leftIcon={isEnglish ? {} : checkMark}
      />
    );
  }
}

ListItemSwitch.propTypes = {
  isEnglish: PropTypes.bool.isRequired,
  selection: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  itemKey: PropTypes.number.isRequired
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
