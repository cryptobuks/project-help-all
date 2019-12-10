import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  FlatList,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import ListItemSwitch from './ListItemSwitch';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

export default class ListSkeleton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection:[],
    };
    this._toggleSingleSelection = this._toggleSingleSelection.bind(this);
    this._toggleMultiSelection = this._toggleMultiSelection.bind(this);
  };
  _toggleSelection(c){
    if (this.props.singleSelection){
      this._toggleSingleSelection(c);
    }else{
      this._toggleMultiSelection(c);
    }
  }
  _toggleMultiSelection = c => {
    const prevSelection = _.clone(this.state.selection);
    if (_.includes(prevSelection ,c)){
      this.setState({ selection:_.filter(prevSelection,s => {return s.id !== c.id})})
    } else {
      this.setState({ selection: prevSelection.concat(c)})
    }
  };
  _toggleSingleSelection = c => {
      const prevSelection = _.clone(this.state.selection);
      if (prevSelection.length === 1 && _.includes(prevSelection ,c)){
        this.setState({ selection:_.filter(prevSelection,s => {return s._id !== c._id})})
      }else if (prevSelection.length === 0  && !_.includes(prevSelection ,c)){
        this.setState({ selection: prevSelection.concat(c)})
      }else{
        this.setState({ selection: [].concat(c)})
      }
  }

  render() {
    const {
      data,
      headerTitleEN,
      headerTitleAR,
      buttonTitle,
      isEnglish
    } = this.props;
    const { selection } = this.state;
    const headerTitle = isEnglish ? headerTitleEN : headerTitleAR;
    return (
      <View style={styles.container}>
      <View>
      <Text style={[isEnglish ?null : {alignSelf:'flex-end'},styles.header]}>{headerTitle}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {data.map((l, i) => (
          <TouchableOpacity key={i} onPress={() => {this._toggleSelection(l)}}>
          <ListItemSwitch
            isEnglish={isEnglish}
            itemKey={i}
            item={l}
            selection={selection}/>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
      <View style={styles.buttonWrapper}>
      <Button
        title={buttonTitle}
        raised
        disabled={_.isEmpty(selection)}
        onPress={()=>this.props.handleButtonPress({payload:selection})}
      />
      </View>
      </View>
      </View>
    );
  }
}

ListSkeleton.propTypes = {
  data: PropTypes.array.isRequired,
  headerTitleEN: PropTypes.string.isRequired,
  headerTitleAR: PropTypes.string.isRequired,
  singleSelection: PropTypes.bool.isRequired,
  handleButtonPress: PropTypes.func.isRequired,
  isEnglish: PropTypes.bool.isRequired
};


const styles = StyleSheet.create({
  container:{
    flex:1
  },
  header: {
    fontSize: 24,
    color: 'grey',
    fontWeight: '600',
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom:20,
  },
  checkmarkWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 12
  },
  buttonWrapper:{
    width:200,
  },
  buttonContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
