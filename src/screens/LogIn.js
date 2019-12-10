import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  Modal,
  Animated,
  Easing
} from 'react-native';
import { Button } from 'react-native-elements';
import {
  TextField,
} from 'react-native-material-textfield';
import CodeInput from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  loginPatron,
  activatePatron,
  setNewCredentials,
  logoutPatron
} from '../redux/actions/auth';
import { connect } from 'react-redux';


class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleCheckmarkValue: new Animated.Value(0),
      isEnglish: this.props.auth.languageEN,
      codeInputFocused:false,
      showCodeInput:false,
      showExtraField:false,
      showSubmitButton:false,
      isMatch:false,
      username:'',
      password:'',
      secondPass:'',
      identifier:'',
      code:'',
      recoveredUsername:'',
      errors: {},
      userLabel:this.props.auth.languageEN ? 'Username': 'اسم الحساب',
      passLabel:this.props.auth.languageEN ? 'Password': 'كلمة السر',
      secondPassLabel:this.props.auth.languageEN ? 'Verify password': 'اكد كلمة السر',
      identifierLabel:'Identifier',
      actionTitle:this.props.auth.languageEN ? 'Register, or recover account':'استعادة ، تسجيل الحساب',
      submitButtonLabel: this.props.auth.languageEN ? 'Submit':'حفظ',
    };
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.usernameRef = this.updateRef.bind(this, 'username');
    this.secondPassRef = this.updateRef.bind(this, 'secondPass');
    this.identifierRef = this.updateRef.bind(this, 'identifier');
    this.verifyCode = this.verifyCode.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitUsername = this.onSubmitUsername.bind(this);
    this.handleSubmitPress = this.handleSubmitPress.bind(this);
    this.updateRef = this.updateRef.bind(this);
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
  };

  _logoutUser = () => {
    this.props.logoutPatron();
    this.props.navigation.goBack();
  }
  componentDidMount() {
    this.props.navigation.setParams({
      logoutUser: this._logoutUser,
      isEnglish:this.props.auth.languageEN});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isVerified && !nextProps.auth.isLoggedIn){
      return Object.assign({},prevState,{
        showExtraField:true,
        showCodeInput:false,
        isEnglish:nextProps.auth.languageEN,
        recoveredUsername:nextProps.auth.username
      })
    };
    if (nextProps.auth.isLoggedIn){
        nextProps.navigation.navigate('AdminListings',{transition: nextProps.auth.languageEN ? null : 'slideFromLeft'});
    }
    return {isEnglish:nextProps.auth.languageEN,errors:nextProps.auth.errors};
  }

  verifyCode = verificationCode => {
    const { identifier } = this.state;
    if(identifier){
      this.setState({code:verificationCode});
      this.props.activatePatron({code:verificationCode,identifier:identifier});
    }else{
      this.setState({showSubmitButton:true,code:verificationCode});
    }
  };
  handleSubmitPress = (input) => {
    const {
      username,
      password,
      identifier,
      code } = this.state;
    switch(input) {
      case 0:
        // activate/recover account
        this.props.activatePatron({identifier:identifier,code:code})
        break;
      case 1:
        // log In
        console.log({username:username,password:password});
        this.props.loginPatron({username:username,password:password})
        break;
      case 2:
        // Set Password
        const _username = username || this.props.auth.username;
        this.props.setNewCredentials({username:_username,password:password,identifier:identifier})
        break;
      default:
        alert('Something went wrong, please try again');
    }
  };
  onFocus() {
     let { errors } = this.state;
     for (let name in errors) {
       let ref = this[name];
       if (ref && ref.isFocused()) {
         delete errors[name];
       }
     }

     this.setState({ errors });
   }
  onSubmitUsername() {
     this.password.focus();
   }
  onChangeText(text) {
   ['username', 'identifier', 'password', 'secondPass']
     .map((name) => ({ name, ref: this[name] }))
     .forEach(({ name, ref }) => {
       if (ref && ref.isFocused()) {
         const _isMatch = {isMatch:((name === 'secondPass') && (text === this.state.password))};
         const newState = Object.assign({},{ [name]: text }, _isMatch)
         this.setState(newState);
         console.log(newState);
       }
     });
 }
  updateRef(name, ref) {
   this[name] = ref;
 }
  scaleCheckmark() {
   Animated.timing(this.state.scaleCheckmarkValue, {
     toValue: 1,
     duration: 800,
     easing: Easing.easeOutBack
   }).start();
  }
  renderPasswordAccessory(){
    this.scaleCheckmark();
    const { scaleCheckmarkValue } = this.state;
    const iconScale = scaleCheckmarkValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.01, 1.6, 1]
    });
    return (
      <Animated.View
      style={[
        { transform: [{ scale: iconScale }] },
        styles.checkmarkWrapper
      ]}
    >
    <Icon name='check' color={'rgba(53,137,220,.95)'} size={20} />
    </Animated.View>)
  }
  render() {
    const cellProps = ({ /*index, isFocused,*/ hasValue }) => {
      if (hasValue) {
        return {
          style: [styles.input, styles.inputNotEmpty]
        };
      }
      return {
        style: styles.input
      };
    };
    const {
      isEnglish,
      actionTitle,
      userLabel,
      passLabel,
      secondPassLabel,
      identifierLabel,
      submitButtonLabel,
      showSubmitButton,
      isMatch,
      showExtraField,
      recoveredUsername,
      errors,
      scaleCheckmarkValue
    } = this.state;
    const iconScale = scaleCheckmarkValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.01, 1.6, 1]
    });
    const codeLabelColor = !this.state.codeInputFocused ? 'grey':'rgba(64,173,239,1)'
    const codeLabelWeight = !this.state.codeInputFocused ? '300':'600'
    const codeLabelSize = !this.state.codeInputFocused ? 16:12
    return (
      <View style={{flex:1}}>
        <Modal animationType='slide' transparent={false} visible={this.state.showCodeInput}>
        <SafeAreaView style={{flex:1}}>
        <View style={{marginLeft:16,width:50,paddingTop:10}}>
          <TouchableOpacity onPress={()=>{this.setState({showCodeInput:false})}}>
        <Icon name={'chevron-down'} size={18} color={'grey'}/>
        </TouchableOpacity>
        </View>

        <View style={[styles.container,{paddingTop:100,paddingBottom:20}]}>
        <TextField
            ref={this.identifierRef}
            secureTextEntry={false}
            autoCapitalize='none'
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            clearTextOnFocus={true}
            onFocus={this.onFocus}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitIdentifier}
            returnKeyType='done'
            label={identifierLabel}
            error={errors.identifier}
            maxLength={30}
         />
        </View>
        <View>
        <Text style={[styles.inputLabel,{color:codeLabelColor,fontWeight:codeLabelWeight,fontSize:codeLabelSize}]}>{'Authentication code'}</Text>
        </View>
        <View style={styles.codeContainer}>
        <CodeInput
          inputProps={
            { onFocus: () => this.setState({codeInputFocused:true}),
              onBlur: () => this.setState({codeInputFocused:false})
         } }
          autoFocus={false}
          autoCapitalize='none'
          blurOnSubmit={false}
          variant='clear'
          containerStyle={styles.inputWrapStyle}
          codeLength={6}
          keyboardType='default'
          cellProps={cellProps}
          onFulfill={code => this.verifyCode(code)}
        />
        { showSubmitButton && <View style={styles.footer}>
        <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
        <Button
          title={submitButtonLabel}
          onPress={()=>this.handleSubmitPress(0)}
          disabled={!this.state.identifier}
          raised
        />
        </View>
        </View>
        </View>}
        </View>
        <View>
        </View>
        </SafeAreaView>
        </Modal>
        <View style={styles.container}>
            { showExtraField &&
            <Text style={{
              fontSize:22,
              marginBottom:20,
              color:'grey',
              fontWeight:'400',
              alignSelf:isEnglish ? 'flex-start' :'flex-end'
            }}>{isEnglish ? 'Update Credentials' : 'تسجيل'}
              </Text>}
              <TextField
                ref={this.usernameRef}
                secureTextEntry={false}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                clearTextOnFocus={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitUsername}
                returnKeyType='done'
                labelTextStyle={{alignSelf:isEnglish ? 'flex-start':'flex-end'}}
                label={(recoveredUsername && recoveredUsername !=='')? recoveredUsername :userLabel}
                error={errors.username}
                editable={!recoveredUsername || (recoveredUsername ==='')}
                maxLength={30}
              />
              <TextField
               ref={this.passwordRef}
               secureTextEntry={true}
               autoCapitalize='none'
               autoCorrect={false}
               enablesReturnKeyAutomatically={true}
               clearTextOnFocus={false}
               onFocus={this.onFocus}
               onChangeText={this.onChangeText}
               onSubmitEditing={this.onSubmitPassword}
               returnKeyType='done'
               labelTextStyle={{alignSelf:isEnglish ? 'flex-start':'flex-end'}}
               label={passLabel}
               error={errors.password}
               maxLength={30}
               renderRightAccessory={isMatch? this.renderPasswordAccessory :()=>null}
             />
           { showExtraField &&
          <TextField
               ref={this.secondPassRef}
               secureTextEntry={true}
               autoCapitalize='none'
               autoCorrect={false}
               enablesReturnKeyAutomatically={true}
               clearTextOnFocus={false}
               onFocus={this.onFocus}
               onChangeText={this.onChangeText}
               onSubmitEditing={this.onSubmitSecondPass}
               returnKeyType='done'
               labelTextStyle={{alignSelf:isEnglish ? 'flex-start':'flex-end'}}
               label={secondPassLabel}
               maxLength={30}
               renderRightAccessory={isMatch? this.renderPasswordAccessory :()=>null}
             />}
         </View>
        { !showExtraField &&
          <View style={styles.actionContainer}>
            <View style={styles.actionWrapper}>
              <TouchableOpacity onPress={()=>{this.setState({showCodeInput:true})}}>
                <Text style={{color:'rgba(32,137,220,0.95)',fontSize:16}}>{actionTitle}</Text>
              </TouchableOpacity>
            </View>
          </View>}
      { <View style={styles.footer}>
      <View style={styles.buttonContainer}>
      <View style={styles.buttonWrapper}>
      <Button
        title={submitButtonLabel}
        onPress={()=>this.handleSubmitPress(showExtraField ? 2:1)}
        disabled={this.props.auth.isLoggedIn ? !isMatch : false}
        raised
      />
      </View>
      </View>
        </View>}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = {
  loginPatron,
  activatePatron,
  setNewCredentials,
  logoutPatron
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40,
  },
  inputWrapStyle: {
    height: 50,
  },
  inputLabel: {
    paddingLeft:30,
    alignSelf:'flex-start',
    paddingTop:20,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: 40,
    borderRadius: 3,
    color: '#fff',
    backgroundColor: 'rgba(32,137,220,0.3)',
  },
  inputNotEmpty: {
    fontSize:16,
    color:'grey',
    backgroundColor: 'white'
  },
  codeContainer:{
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    paddingTop:80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionWrapper: {
    color: 'rgba(32,137,220,0.7)',

  },
  buttonContainer:{
    width:200,
    position:'absolute',
    bottom:70
  },
  buttonWrapper:{
    paddingTop:40,
  },
  footer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 70,
    paddingLeft: 20,
    paddingRight: 20,
  },
  checkmarkWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 12
  }
})
