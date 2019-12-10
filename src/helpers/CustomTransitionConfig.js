import {Animated, Easing } from 'react-native';
let SlideFromRight = (index, position, width) => {
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  })
  return {
    transform: [{ translateX }]
  };
};

let SlideFromLeft = (index, position, width) => {
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [-width, 0, 0]
  })
  return {
    transform: [{ translateX }]
  };
};

const CustomTransitionConfig = () => {
  return {
   transitionSpec: {
     duration: 450,
     easing: Easing.out(Easing.poly(4)),
     timing: Animated.timing,
     useNativeDriver: true,
   },
   screenInterpolator: (sceneProps) => {
     const { layout, position, scene } = sceneProps;
     const width = layout.initWidth;
     const { index, route } = scene
     const params = route.params || {};
     const transition = params.transition || 'default';
     return {
       slideFromLeft: SlideFromLeft(index, position, width),
       default: SlideFromRight(index, position, width),
     }[transition];
   },
 }
}
export default CustomTransitionConfig;
