import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';

export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder:this.props.placeholder,
      secureInput: !(
        props.inputType === 'text' ||
        props.inputType === 'email' ||
        props.inputType === 'number'
      ),
      scaleCheckmarkValue: new Animated.Value(0),
      inputValue: props.defaultValue
    };
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.defineKeyboard = this.defineKeyboard.bind(this);
  }
  defineKeyboard() {
    switch (this.props.inputType) {
      case 'email':
        return 'email-address';
        break;
      case 'number':
        return 'numeric';
        break;
      default:
        return 'default';
        break;
    }
  }
  scaleCheckmark(value) {
    Animated.timing(this.state.scaleCheckmarkValue, {
      toValue: value,
      duration: 400,
      easing: Easing.easeOutBack
    }).start();
  }
  toggleShowPassword() {
    this.setState({ secureInput: !this.state.secureInput });
  }
  onChangeText(text) {
    this.props.onChangeText(text);
    this.setState({ inputValue: text });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return  { placeholder: nextProps.placeholder}
  }
  render() {
    const {
      labelText,
      labelTextSize,
      labelTextWeight,
      labelColor,
      labelStyle,
      textColor,
      borderBottomColor,
      inputType,
      customStyle,
      inputStyle,
      onChangeText,
      showCheckmark,
      autoFocus,
      autoCapitalize,
      defaultValue,
      editable,
      onFocus,
      maxLength
    } = this.props;
    const { secureInput, scaleCheckmarkValue, inputValue, placeholder } = this.state;
    const fontSize = labelTextSize || 14;
    const fontWeight = labelTextWeight || '700';
    const color = labelColor || 'rgba(53,137,220,.95)';
    const inputColor = textColor || 'rgba(53,137,220,.95)';
    const borderBottom = borderBottomColor || 'transparent';
    const keyboardType = this.defineKeyboard();
    const customInputStyle = inputStyle || {};
    if (!inputStyle || (inputStyle && !inputStyle.paddingBottom)) {
      customInputStyle.paddingBottom = 5;
    }

    const iconScale = scaleCheckmarkValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.01, 1.6, 1]
    });

    const scaleValue = showCheckmark ? 1 : 0;
    this.scaleCheckmark(scaleValue);

    return (
      <View style={[customStyle, styles.wrapper]}>
        <Text style={[{ fontWeight, color, fontSize }, styles.label,labelStyle]}>
          {labelText}
        </Text>
        {inputType === 'password' ? (
          <TouchableOpacity
            style={styles.showButton}
            onPress={this.toggleShowPassword}
          >
            <Text style={styles.showButtonText}>
              {secureInput ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        ) : null}
        <Animated.View
          style={[
            { transform: [{ scale: iconScale }] },
            styles.checkmarkWrapper
          ]}
        >
          <Icon name='check' color={'rgba(53,137,220,.95)'} size={20} />
        </Animated.View>
        <TextInput
          style={[
            { color: inputColor, borderBottomColor: borderBottom },
            inputStyle,
            styles.inputField
          ]}
          secureTextEntry={secureInput}
          returnKeyType='done'
          onChangeText={this.onChangeText}
          editable={editable}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          onFocus={onFocus}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          underlineColorAndroid='transparent'
          placeholder={placeholder}
          defaultValue={inputValue}
          value={inputValue}
          adjustResize={true}
          maxLength={300}
          maxHeight={inputStyle.height}
        />
      </View>
    );
  }
}

InputField.propTypes = {
  labelText: PropTypes.string,
  labelTextSize: PropTypes.number,
  labelColor: PropTypes.string,
  textColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  customStyle: PropTypes.object,
  onChangeText: PropTypes.func,
  showCheckmark: PropTypes.bool.isRequired,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool,
  editable: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  labelTextWeight: PropTypes.string,
  inputStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  multiline: PropTypes.bool,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex'
  },
  label: {
    marginBottom: 20
  },
  inputField: {
    borderBottomWidth: .5,
    paddingTop: 5
  },
  showButton: {
    position: 'absolute',
    right: 0
  },
  showButtonText: {
    color: 'white',
    fontWeight: '700'
  },
  checkmarkWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 12
  }
});
