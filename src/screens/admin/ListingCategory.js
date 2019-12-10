import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import ListSkeleton from '../../components/ListSkeleton';

class ListingCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection:[],
    };
    this.actionHandler = this.actionHandler.bind(this);
  };
  actionHandler = (input) => {
        this.setState({
          selection:input.payload[0]
        })
    const params = {
        transition: this.props.auth.languageEN ? null : 'slideFromLeft',
        category:input.payload[0],
        isEnglish: this.props.auth.languageEN
      };
    this.props.navigation.navigate('ListingItems',params);
  }
  render() {
    return (
      <View style={{flex: 1,flexDirection:'column',justifyContent:'flex-start'}}>
      <ListSkeleton
       isEnglish={this.props.auth.languageEN}
       data={this.props.data.categories}
       headerTitleEN={'Select Categories'}
       headerTitleAR={' اختر الفئة'}
       buttonTitle={this.props.auth.languageEN? 'Next':'حفظ'}
       singleSelection={true}
       handleButtonPress={(payload) => {this.actionHandler(payload)}}
       />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  auth: state.auth,
});
const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingCategory);

const styles = StyleSheet.create({

})
